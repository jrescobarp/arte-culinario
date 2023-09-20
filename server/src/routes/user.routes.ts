import express from "express";
const userRouter = express.Router();

const userController = require('../controllers/usersController');

userRouter.post("/register",userController.register_user);
 
module.exports = userRouter;
// userRouter.get("/", async (_req, res) => {
//    try {
//        const users = await collections.users.find({}).toArray();
//        res.status(200).send(users);
//    } catch (error) {
//        res.status(500).send(error.message);
//    }
// });

// userRouter.get("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const receta = await collections.users.findOne(query);
  
//         if (receta) {
//             res.status(200).send(receta);
//         } else {
//             res.status(404).send(`Failed to find a recipe: ID ${id}`);
//         }
  
//     } catch (error) {
//         res.status(404).send(`Failed to find a recipe: ID ${req?.params?.id}`);
//     }
//  });

// userRouter.post("/signup", async (req, res) => {
//     try {
//         const user = req.body;
//         const result = await collections.users.insertOne(user);
  
//         if (result.acknowledged) {
//             res.status(201).send(`Created a new user: ID ${result.insertedId}.`);
//         } else {
//             res.status(500).send("Failed to create a new user.");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(400).send(error.message);
//     }
//  });
 

//  userRouter.put("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const receta = req.body;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const result = await collections.users.updateOne(query, { $set: receta });
  
//         if (result && result.matchedCount) {
//             res.status(200).send(`Updated an receta: ID ${id}.`);
//         } else if (!result.matchedCount) {
//             res.status(404).send(`Failed to find an receta: ID ${id}`);
//         } else {
//             res.status(304).send(`Failed to update an receta: ID ${id}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
//  });

//  userRouter.delete("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const result = await collections.users.deleteOne(query);
  
//         if (result && result.deletedCount) {
//             res.status(202).send(`Removed an employee: ID ${id}`);
//         } else if (!result) {
//             res.status(400).send(`Failed to remove an employee: ID ${id}`);
//         } else if (!result.deletedCount) {
//             res.status(404).send(`Failed to find an employee: ID ${id}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
//  });
 