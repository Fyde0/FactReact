import { decode } from 'html-entities';
import IQuestion from '../interfaces/question';

export interface IQuestionProps {
    key: string
    question: IQuestion
    updateRadios: (questionId: string, answerId: string) => void;
    showResults: boolean
}

function Question(props: IQuestionProps) {

    if (props.showResults) {
        props.question.answers = props.question.answers.map((answer) => {
            if (answer.correct) {
                return { ...answer, class: "correct" }
            } else if (!answer.correct && answer.checked) {
                return { ...answer, class: "wrong" }
            } else {
                return { ...answer, class: "grey" }
            }
        })
    }

    return (
        <fieldset key={props.question.id} className="question">
            <legend>{decode(props.question.question)}</legend>
            {props.question.answers.map((answer) => (
                <label key={answer.id} className="answer">
                    <input
                        type="radio"
                        name={"question-" + props.question.index}
                        value={decode(answer.value)}
                        className="radio"
                        checked={!props.showResults && answer.checked}
                        disabled={props.showResults}
                        onChange={
                            () => props.updateRadios(props.question.id, answer.id)
                        }
                    />
                    <span className={"answerSpan " + answer.class}>{decode(answer.value)}</span>
                </label>
            ))}
        </fieldset>
    )
}

export default Question