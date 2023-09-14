import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { commentRouter } from "./routes/comment.routes";
import { imageRouter } from './routes/image.routes'
import { recipeRouter } from './routes/recipe.routes'
import { userRouter } from './routes/user.routes'

 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI } = process.env;
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());
 
       app.use("/comments", commentRouter);
       app.use("/images", imageRouter);
       app.use("/recipes", recipeRouter);
       app.use("/user", userRouter);

       // start the Express server
       app.listen(5200, () => {
           console.log(`Server running at http://localhost:5200...`);
       });
 
   })
   .catch(error => console.error(error));