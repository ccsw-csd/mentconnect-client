import { Questionnaire } from "src/app/questionnaire/model/Questionnaire";
import { Question } from "./Question";
import { WeekDay } from "./WeekDay";

export class QuestionnaireQuestion {
    id: number;
    questionnaire: Questionnaire;
    question: Question;
    timeslot: string;
    weekDays: WeekDay[];  

    constructor(questionnaire, question, timeslot, weekDays){
        this.questionnaire = questionnaire;
        this.question = question;
        this.timeslot = timeslot;
        this.weekDays = weekDays;
    }

}

