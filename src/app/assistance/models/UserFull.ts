import { Role } from "./Role";

export class UserFull {
    id!: number;
    username: string;
    name: string; 
    surnames: string; 
    email: string;
    roles: Role[];
}
  