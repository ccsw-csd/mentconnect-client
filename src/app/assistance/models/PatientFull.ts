import { UserFull } from "../../management/models/UserFull"; 

export class PatientFull {
    id!: number;
    user!: UserFull;
    nif!: string;
    gender!: string;
    dateBirth!: Date;
    phone!: string;
    sip: string;
    medicalHistory: string;


    constructor(user, nif, gender, dateBirth, phone, sip, medicalHistory){
        this.user = user;
        this.nif = nif;
        this.gender = gender;
        this.dateBirth = dateBirth;
        this.phone = phone;
        this.sip = sip;
        this.medicalHistory = medicalHistory;
    }
}
