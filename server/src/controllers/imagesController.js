const Image = require("../models/image");
const Comment = require("../models/comment");
const Recipe = require("../models/recipe");
const asyncHandler = require("express-async-handler");

exports.get_comments = asyncHandler(async(req, res, next) => {
    // Comment.findById(req.params.id).populate('replies').then((comment) =>{
    //     res.status(200).send(comment);
    // });
});

exports.create_image = asyncHandler(async(req, res, next) => {
    // Comment.findById(req.params.id).populate('replies').then((comment) =>{
    //     res.status(200).send(comment);
    // });
});