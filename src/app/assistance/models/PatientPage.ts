import { Pageable } from "src/app/core/models/Pageable";
import { Patient } from "./Patient";

export class PatientPage {
    content: Patient[];
    pageable: Pageable;
    totalElements: number;
}