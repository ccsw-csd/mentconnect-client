import { Pageable } from "src/app/core/models/Pageable";
import { User } from "src/app/core/models/User";
import { Questionnaire } from "./Questionnaire";

export class QuestionnairePage{
    content: Questionnaire[];
    pageable: Pageable;
    totalElements: number;
    
}