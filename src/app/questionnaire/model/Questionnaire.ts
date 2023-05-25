import { User } from "src/app/management/models/User";
import { Patient } from "src/app/assistance/models/Patient";
import { Question } from "src/app/questionnaire/model/Question";
import { QuestionnaireQuestion } from "./QuestionnaireQuestion";

export class Questionnaire {
    id: number;
    description: string;
    questions: QuestionnaireQuestion[];
    patients: Patient[];
    user: User;
    createDate: Date;
    lastEditDate: Date;  

    constructor(id?, description?, questions?, patients?, user?, createDate?, lastEditDate?){
        this.id = id;
        this.description = description;
        this.questions = questions;
        this.patients = patients;
        this.user = user;
        this.createDate = createDate;
        this.lastEditDate = lastEditDate;
    }

}

