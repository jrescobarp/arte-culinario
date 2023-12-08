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
    const image = new Image(req.body);
    const imgs = req.files.map(f => ({ url: f.location, filename: f.key }));
    image.imgDataArr.push(...imgs);
    image.upvotes = 0;
    await image.save();
    const response = await Recipe.findByIdAndUpdate(req.body.recipe_id, {$push:{images:image._id}});
    res.status(200).send(response);
});