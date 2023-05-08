import { Questionnaire } from "src/app/questionnaire/model/Questionnaire";
import { Question } from "./Question";
import { WeekDay } from "./WeekDay";
import { AnswerType } from "./AnswerType";

export class QuestionnaireQuestion {
    id: number;
    questionnaire: Questionnaire;
    question: Question;
    timeslot: string;
    weekDays: WeekDay[];  
    alertConfigAnswerType: AnswerType;
    alertConfigConsecutiveAnswers: number;

    constructor(questionnaire, question, timeslot, weekDays, alertConfigAnswerType?, alertConfigConsecutiveAnswers?){
        this.questionnaire = questionnaire;
        this.question = question;
        this.timeslot = timeslot;
        this.weekDays = weekDays;
        this.alertConfigAnswerType = alertConfigAnswerType;
        this.alertConfigConsecutiveAnswers = alertConfigConsecutiveAnswers;
    }

}

