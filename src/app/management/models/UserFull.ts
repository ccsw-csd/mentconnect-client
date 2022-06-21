import { Role } from "../../assistance/models/Role";

export class UserFull {
    id!: number;
    username: string;
    name: string; 
    surnames: string; 
    email: string;
    roles: Role[];

    constructor(username, name, surnames, email, roles){
        this.username = username;
        this.name = name;
        this.surnames = surnames;
        this.email = email;
        this.roles = roles;
    }
}
  