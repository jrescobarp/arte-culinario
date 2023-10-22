const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    upvotes:{
        type: Number,
        default: 0
    },
    replies:{
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    }
});



module.exports = mongoose.model("Comment", CommentSchema);