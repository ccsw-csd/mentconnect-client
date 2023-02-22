import { Role } from "./Role";
import { Patient } from '../../assistance/models/Patient';

export class UserFull {
    id!: number;
    username: string;
    name: string; 
    surnames: string; 
    email: string;
    roles: Role[];
    patients: Patient[];

    constructor(username?, name?, surnames?, email?, roles?, patients?){
        this.username = username;
        this.name = name;
        this.surnames = surnames;
        this.email = email;
        this.roles = roles;
        this.patients = patients;
    }
}
  