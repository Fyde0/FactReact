import IAnswer from "./answer"

export default interface IQuestion {
    id: string
    index: number
    question: string
    answers: IAnswer[]
}