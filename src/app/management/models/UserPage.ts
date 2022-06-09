import { Pageable } from "src/app/core/models/Pageable";
import { UserList } from "./UserList";

export class UserPage {
    content: UserList[];
    pageable: Pageable;
    totalElements: number;


}