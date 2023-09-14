import * as mongodb from "mongodb";
 
export interface User {
    _id?: mongodb.ObjectId;
    name: string;
    username: string; 
    email: string;
    password: string;
    comments: string[];
    images: string[];
    recipes: string[];
    tssci: boolean; 
}