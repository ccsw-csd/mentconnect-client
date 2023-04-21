import { Patient } from "./Patient";

export class Diary {
    id: number;
    description: string;
    createDate: Date;
    patient: Patient; 
}