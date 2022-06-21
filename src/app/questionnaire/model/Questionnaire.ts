import { UserDetailsJWT } from "src/app/core/models/UserDetailsJWT";

export class Questionnaire {
    id: number;
    description: string;
    questionsNumber: number;
    patientsNumber: number;
    user: UserDetailsJWT;
    createDate: Date;
    lastEditDate: Date;

  
}