import { User } from "../models/user.model";

export interface LoadUser {
    countUsers: number;
    allUsers: User[];
}