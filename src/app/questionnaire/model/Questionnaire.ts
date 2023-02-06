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

    public constructor(init?:Partial<Questionnaire>) {
        Object.assign(this, init);
    }
}

