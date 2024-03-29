import { AnswerType } from "./AnswerType";

export class AnswerTypeValue {
    id: number;
    value: string;
    answerType: AnswerType;

    constructor(value){
        this.value = value;
    }
}