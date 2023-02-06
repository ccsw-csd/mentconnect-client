import { AnswerType } from "src/app/questionnaire/model/AnswerType";

export class Question{
    id: number;
    question: string;
    answerType: AnswerType;
}