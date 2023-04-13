import { Patient } from "src/app/assistance/models/Patient";
import { Questionnaire } from "src/app/questionnaire/model/Questionnaire";

export class QuestionnairePatient {
    id: number;
    questionnaire: Questionnaire;
    patient: Patient;
    startDate: Date;
    endDate: Date;  

    constructor(questionnaire, patient, startDate, endDate){
        this.questionnaire = questionnaire;
        this.patient = patient;
        this.startDate = startDate;
        this.endDate = endDate;
    }

}

