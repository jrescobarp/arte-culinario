const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
        user_id: {
            type:Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        recipe_id: {
            type:Schema.Types.ObjectId,
            ref: 'Recipe',
            required: true
        },
        username: {
            type: String,
            required: true
        },
        url: {
            type: [String],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        upvotes: {
            type: Number,
        },
        // report: string,
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'Comment'
        },
});


module.exports = mongoose.model("Image", ImageSchema);