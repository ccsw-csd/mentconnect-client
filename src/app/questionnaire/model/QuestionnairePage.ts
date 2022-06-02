import { Pageable } from "src/app/core/models/Pageable";
import { Questionnaire } from "./Questionnaire";

export class QuestionnairePage{
    content: Questionnaire[];
    pageable: Pageable;
    totalElements: number;
    
}