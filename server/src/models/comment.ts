import * as mongodb from "mongodb";
 
export interface Comment {
    _id?: mongodb.ObjectId;
    user_id: string;
    text: string;
    // location: string;
}