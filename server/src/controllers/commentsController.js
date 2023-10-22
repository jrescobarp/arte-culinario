const Comment = require("../models/comment");
const Recipe = require("../models/recipe");
const asyncHandler = require("express-async-handler");


// exports.get_all_recipes = asyncHandler(async(req, res, next) => {
//     const allRecipeInstances = await Recipe.find().exec();
//     res.status(200).send(allRecipeInstances);
// });

// exports.get_one_recipes = asyncHandler(async(req, res, next) => {
//     Recipe.findById(req.params.id).then((recipe) =>{
//         res.status(200).send(recipe);
//     });
// });

exports.create_comment = asyncHandler(async(req, res, next) => {
    const { user_id, text, upvotes, replies } = req.body;
    const comment = new Comment({user_id, text, upvotes, replies});
    req.body.update_arr.push(comment._id);
    await comment.save();
    let response;
    if(req.body.parent_type === 'recipe'){
        response = Recipe.findByIdAndUpdate(req.body.parent_id, {comments:req.body.update_arr}).then((res) => {
        }).catch((err) => {
            //catch error
        });
    }
    res.status(200).send(response);
});

// exports.edit_recipe = asyncHandler(async(req, res, next) => {
//     res.send("Not Currently implemented:edit_recipe");
// });

// exports.delete_recipe = asyncHandler(async(req, res, next) => {
//     res.send("Not Currently implemented:delete_recipe");
// });