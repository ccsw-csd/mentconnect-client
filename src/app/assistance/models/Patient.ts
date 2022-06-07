import { UserFull } from "./UserFull"; 

export class Patient {
    id!: number;
    user!: UserFull;
    nif!: string;
    gender: string;
    dateBirth!: Date;
    phone!: string;
    sip: number;
    medicalHistory: number;
}
