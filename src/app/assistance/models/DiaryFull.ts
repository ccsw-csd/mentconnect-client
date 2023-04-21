import { Patient } from "./Patient";

export class DiaryFull {
    id: number;
    description: string;
    createDate: Date;
    patient: Patient; 

    constructor(description, createDate, patient){
        this.description = description;
        this.createDate = createDate;
        this.patient = patient;
    }
}
