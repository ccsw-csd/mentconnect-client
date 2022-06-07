import { UserFull } from "./UserFull"; 

export class Patient {
    user: UserFull;
    id!: number;
    nif: string;
    sex!: string;
    age!: Date;
    phone: string;
    sip!: number;
    clinic!: number;
}
