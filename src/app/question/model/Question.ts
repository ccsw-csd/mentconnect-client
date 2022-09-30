import { AnswerType } from "src/app/answer_type/model/AnswerType";

export class Question{
    id: number;
    question: string;
    answerType: AnswerType;
}