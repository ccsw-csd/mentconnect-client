import { Questionnaire } from "src/app/questionnaire/model/Questionnaire";
import { Question } from "./Question";

export class QuestionnaireQuestion {
    id: number;
    questionnaire: Questionnaire;
    question: Question;
    timeslot: string;
    weekDays: number[];  

    constructor(questionnaire, question, timeslot, weekDays){
        this.questionnaire = questionnaire;
        this.question = question;
        this.timeslot = timeslot;
        this.weekDays = weekDays;
    }

}

