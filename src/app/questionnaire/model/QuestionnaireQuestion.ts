import { Questionnaire } from "src/app/questionnaire/model/Questionnaire";
import { Question } from "./Question";

export class QuestionnaireQuestion {
    id: number;
    questionnaire: Questionnaire;
    question: Question;
    timeSlot: string;
    dayWeeks: number[];  

    constructor(questionnaire, question, timeSlot, dayWeeks){
        this.questionnaire = questionnaire;
        this.question = question;
        this.timeSlot = timeSlot;
        this.dayWeeks = dayWeeks;
    }

}

