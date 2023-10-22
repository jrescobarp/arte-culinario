import express from "express";
const commentRouter = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn');

const commentController = require('../controllers/commentsController');

commentRouter.post("/",commentController.create_comment);

module.exports = commentRouter;
