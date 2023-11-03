import express from "express";
const imageRouter = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn');

const imageController = require('../controllers/imagesController');

imageRouter.get("/:id",imageController.get_images);
imageRouter.post("/",imageController.create_image);
// imageRouter.put("/:id",imageController.edit_image);

module.exports = imageRouter;
