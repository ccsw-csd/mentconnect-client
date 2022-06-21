import { User } from "src/app/management/models/User";

export class Questionnaire {
    id: number;
    description: string;
    questionsNumber: number;
    patientsNumber: number;
    user: User;
    createDate: Date;
    lastEditDate: Date;  
}