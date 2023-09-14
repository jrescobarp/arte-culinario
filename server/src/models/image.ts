import * as mongodb from "mongodb";
import { Comment } from './comment'
 
export interface Image {
    _id?: mongodb.ObjectId;
    user_id: string;
    url: string;
    upvotes: number;
    // report: string;
    comments: string[];
}