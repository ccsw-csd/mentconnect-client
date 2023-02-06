import { User } from "src/app/management/models/User";

export class Patient {
    id: number;
    user: User; 
    nif: string;
    gender: string;
    dateBirth: Date;
    phone: string;
    sip: string;
    medicalHistory: string;
}