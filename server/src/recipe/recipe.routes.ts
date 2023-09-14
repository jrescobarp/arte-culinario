import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";
 
export const recipeRouter = express.Router();
recipeRouter.use(express.json());
 
recipeRouter.get("/", async (_req, res) => {
   try {
       const recipes = await collections.recipes.find({}).toArray();
       res.status(200).send(recipes);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

recipeRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const receta = await collections.recipes.findOne(query);
  
        if (receta) {
            res.status(200).send(receta);
        } else {
            res.status(404).send(`Failed to find an receta: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an receta: ID ${req?.params?.id}`);
    }
 });

recipeRouter.post("/", async (req, res) => {
    try {
        const receta = req.body;
        const result = await collections.recipes.insertOne(receta);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new receta: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new receta.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });
 

 recipeRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const receta = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.recipes.updateOne(query, { $set: receta });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an receta: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an receta: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an receta: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 recipeRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.recipes.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an employee: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an employee: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });
 