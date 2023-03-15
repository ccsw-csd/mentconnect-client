import { Patient } from "src/app/assistance/models/Patient";
import { Questionnaire } from "src/app/questionnaire/model/Questionnaire";

export class QuestionnairePatient {
    id: number;
    description: string;
    questionnaire: Questionnaire;
    patient: Patient;
    startDate: Date;
    endDate: Date;  

    // public constructor(init?:Partial<QuestionnairePatient>) {
    //     Object.assign(this, init);
    // }
}

