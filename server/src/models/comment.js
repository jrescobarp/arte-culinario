const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    text: {
        type: string,
        required: true
    },
    upvotes:{
        type: Number,
        default: 0
    }
    // location: string;
});



module.exports = mongoose.model("Comment", CommentSchema);