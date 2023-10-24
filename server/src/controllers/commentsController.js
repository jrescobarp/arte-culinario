const Comment = require("../models/comment");
const Recipe = require("../models/recipe");
const asyncHandler = require("express-async-handler");

exports.get_comments = asyncHandler(async(req, res, next) => {
    Comment.findById(req.params.id).populate('replies').then((comment) =>{
        res.status(200).send(comment);
    });
});

exports.create_comment = asyncHandler(async(req, res, next) => {
    const { user_id, text, upvotes, replies, username } = req.body;
    const comment = new Comment({user_id, text, upvotes, replies, username});
    req.body.update_arr.push(comment._id);
    await comment.save();
    let response;
    if(req.body.parent_type === 'recipe'){
        response = Recipe.findByIdAndUpdate(req.body.parent_id, {comments:req.body.update_arr}).then((res) => {
        }).catch((err) => {
            //catch error
        });
    }
    if(req.body.parent_type === 'comment'){
        response = Comment.findByIdAndUpdate(req.body.parent_id, {replies:req.body.update_arr}).then((res) => {
        }).catch((err) => {
            //catch error
        });
    }
    res.status(200).send(response);
});
