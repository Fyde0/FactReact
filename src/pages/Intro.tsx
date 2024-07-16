import { Form, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";

function Intro() {
    const difficulties = ["easy", "medium", "hard"]
    const navigation = useNavigation()

    if (navigation.state === "loading") {
        return <Loading />
    }

    return (
        <Form action="game" style={{ height: "100vh" }}>
            <main style={{ gap: "0px" }}>
                <h1>ReactFact</h1>
                <h3>A general knowledge quiz</h3>
                <fieldset
                    className="question"
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <legend style={{ marginRight: "auto", marginLeft: "auto" }}>Choose a difficulty</legend>
                    {difficulties.map((difficulty, i) => (
                        <label key={i} className="answer">
                            <input
                                type="radio"
                                name="diff"
                                value={difficulty}
                                className="radio"
                                defaultChecked={difficulty === "easy"}
                            >
                            </input>
                            <span className="answerSpan">
                                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                            </span>
                        </label>
                    ))}
                </fieldset>
                <button className="button startButton">Start Quiz</button>
            </main >
        </Form>
    )
}

export default Intro