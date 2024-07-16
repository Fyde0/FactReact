import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { nanoid } from "nanoid";
// Components
import Question from "../components/Question";
// Interfaces
import IQuestion from "../interfaces/question";
import IAnswer from "../interfaces/answer";

export async function loader({ request }: any) {
    const url = new URL(request.url)
    const diff = url.searchParams.get("diff")

    // if !diff or invalid string, it defaults to easy
    const apiUrl = "https://opentdb.com/api.php?amount=5&category=9&difficulty="
        + diff + "&type=multiple"

    const response = await fetch(apiUrl)
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }
    const data = await response.json();

    const questions: IQuestion[] = data.results.map((question: any, i: number) => {
        // join wrong and right answers
        let allAnswers = [...question.incorrect_answers, question.correct_answer]
        // shuffle (basic shuffling, not very good)
        let allAnswersShuffled = allAnswers.sort((_a, _b) => 0.5 - Math.random())
        // create answers array
        let allAnswersShuffledObj = allAnswersShuffled.map(answer => (
            {
                "id": nanoid(),
                "value": answer,
                "checked": false,
                "correct": answer === question.correct_answer,
                "class": ""
            } as IAnswer
        ))
        // create question
        return ({
            "id": nanoid(),
            "index": i,
            "question": question.question,
            "answers": allAnswersShuffledObj
        } as IQuestion)
    })

    return questions

}

function Game() {
    const [questions, setQuestions] = useState(useLoaderData() as IQuestion[]) // apparently this is the best way
    const [showResults, setShowResults] = useState<boolean>(false)
    const [correctAnswers, setCorrectAnswers] = useState<number>(0)

    const navigate = useNavigate();

    // Control radio buttons
    function updateRadios(questionId: string, answerId: string) {
        setQuestions((prevQuestions: IQuestion[]) => (
            prevQuestions.map((question) => {
                let newAnswers = question.answers
                // if it's the correct question, select the answer
                // otherwise keep the current one
                if (questionId === question.id) {
                    newAnswers = question.answers.map((answer) => {
                        let status = questionId === question.id && answerId === answer.id
                        return { ...answer, checked: status }
                    })
                }
                return { ...question, answers: newAnswers }
            })
        ))
    }

    function checkAnswers() {
        let questionsAnswered: number = 0
        let questionsCorrect: number = 0
        questions.forEach(question => {
            question.answers.forEach(answer => {
                if (answer.checked) {
                    questionsAnswered += 1
                    if (answer.correct) {
                        questionsCorrect += 1
                    }
                }
            })
        })
        if (questionsAnswered === 5) {
            setCorrectAnswers(questionsCorrect)
            setShowResults(true)
        }
    }

    return (
        <main>
            {questions.map((question) => {
                return (
                    <Question
                        key={nanoid()}
                        question={question}
                        updateRadios={updateRadios}
                        showResults={showResults}
                    />
                )
            })}
            <div className="bottom">
                {showResults &&
                    <span className="bottomText">
                        You got {correctAnswers}/5 answers correct!
                    </span>
                }
                <button
                    className="button checkAnswersButton"
                    onClick={!showResults ? checkAnswers : () => navigate("/")}
                >
                    {!showResults ? "Check answers" : "Play again"}
                </button>
            </div>
        </main>
    )
}

export default Game