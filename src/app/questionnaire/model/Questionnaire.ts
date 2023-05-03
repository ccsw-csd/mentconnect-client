import { User } from "src/app/management/models/User";
import { Patient } from "src/app/assistance/models/Patient";
import { Question } from "src/app/questionnaire/model/Question";

export class Questionnaire {
    id: number;
    description: string;
    questions: Question[];
    patients: Patient[];
    user: User;
    createDate: Date;
    lastEditDate: Date;  

    constructor(description?, questions?){
        this.description = description;
        this.questions = questions;
    }

}

