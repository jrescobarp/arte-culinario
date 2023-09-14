import * as mongodb from "mongodb";
import { Recipe } from "./models/recipe";
import { Comment } from "./models/comment";
// import { User } from "./models/user";
import { Image } from "./models/image";
 
export const collections: {
   recipes?: mongodb.Collection<Recipe>;
   comments?: mongodb.Collection<Comment>;
//    users?: mongodb.Collection<User>;
   images?: mongodb.Collection<Image>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("staging");
   await applySchemaValidation(db);
 
   const RecipesCollection = db.collection<Recipe>("recipes");
   collections.recipes = RecipesCollection;
   
   const CommentsCollection = db.collection<Comment>("comments");
   collections.comments = CommentsCollection;
   
//    const UsersCollection = db.collection<User>("users");
//    collections.users = UsersCollection;
   
   const ImagesCollection = db.collection<Image>("images");
   collections.images = ImagesCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Recipe model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchemaRecipe = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name", "steps", "ingredients"],
           additionalProperties: false,
           properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required and is a string",
            },
            description: {
                bsonType: "string",
            },
            portions: {
                bsonType: "string",
            },
            steps: {
                bsonType: "string[]",
                description: "'steps' is required and is a string",
            },
            verbs: {
                bsonType: "string[]",
            },
            ingredients: {
                bsonType: "string[]",
                description: "'ingredients' is required and is a string",
            },
            type: {
                bsonType: "string[]",
                description: "'type' is required and is a string",
            },
            connected_recipes: {
                bsonType: "string[]",
            },
            comments: {
                bsonType: "string[]",
            },
           },
       },
   };

   const jsonSchemaComment = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "user_id", "text", "location"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                user_id: {
                    bsonType: "string",
                    description: "'user_id' is required and is a string",
                },
                text: {
                    bsonType: "string",
                    description: "'user_id' is required and is a string",
                },
                // location: {
                //     bsonType: "string",
                //     description: "'location' is required and is a string",
                // },
            },
        },
    };

    // const jsonSchemaUser = {
    //     $jsonSchema: {
    //         bsonType: "object",
    //         required: ["name", "email","password","tssci","username"],
    //         additionalProperties: false,
    //         properties: {
    //             _id: {},
    //            name: {
    //                bsonType: "string",
    //                description: "'name' is required and is a string",
    //            },
    //            email: {
    //                bsonType: "string",
    //                description: "'email' is required and is a string",
    //            },
    //            username:{
    //                 bsonType: "string",
    //                 description: "'username' is required and is a string",
    //            }
    //            ,
    //            password: {
    //                bsonType: "string",
    //                description: "'password' is required and is a string",
    //            },
    //            comments: {
    //                bsonType: "string[]",
    //            },
    //            images: {
    //                bsonType: "string[]",
    //            },
    //            recipe: {
    //                bsonType: "string[]",
    //            },
    //            tssci: {
    //                bsonType: "string[]",
    //                description: "'tssci' is required and is a string",
    //            },
    //         },
    //     },
    // };

    const jsonSchemaImage = {
        $jsonSchema: {
            bsonType: "object",
            required: ["ure", "user_id","level"],
            additionalProperties: false,
            properties: {
                _id: {},
                url: {
                    bsonType: "string",
                    description: "'url' is required and is a string",
                },
                user_id:{
                    bsonType: "string",
                    decription: "User ID is required and is a string"
                },
                upvotes: {
                    bsonType: "string",
                    description: "'upvotes' is required and is a string",
                },
                comments: {
                    bsonType: "string",
                    description: "'comments' is required and is a string",
                },
            },
        },
    };



   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "Recipes",
       validator: jsonSchemaRecipe
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("recipes", {validator: jsonSchemaRecipe});
       }
   });

   await db.command({
    collMod: "Comments",
    validator: jsonSchemaComment
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("comments", {validator: jsonSchemaComment});
        }
    });

    // await db.command({
    //     collMod: "Users",
    //     validator: jsonSchemaUser
    // }).catch(async (error: mongodb.MongoServerError) => {
    //     if (error.codeName === 'NamespaceNotFound') {
    //         await db.createCollection("users", {validator: jsonSchemaUser});
    //     }
    // });

    await db.command({
        collMod: "Images",
        validator: jsonSchemaImage
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("images", {validator: jsonSchemaImage});
        }
    });
}