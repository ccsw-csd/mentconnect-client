import { User } from "src/app/management/models/User";

export class Questionnaire {
    id: number;
    description: string;
    questions: number;
    patients: number;
    user: User;
    createDate: Date;
    lastEditDate: Date;  

    public constructor(init?:Partial<Questionnaire>) {
        Object.assign(this, init);
    }
}

