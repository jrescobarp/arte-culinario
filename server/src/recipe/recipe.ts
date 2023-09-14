import * as mongodb from "mongodb";
 
export interface Recipe {
    _id?: mongodb.ObjectId;
    name: string;
    description: string;
    portions: string;
    steps: string[];
    verbs: string[];
    ingredients: string[];
    type: string[];
    connected_recipes: string[];
    comments: string[];
}