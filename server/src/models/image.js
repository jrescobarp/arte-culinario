const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
        user_id: {
            type:String,
            required: true
        },
        url: {
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
// export interface  {
//     _id?: mongodb.ObjectId;
//     user_id: string;
//     url: string;
//     upvotes: number;
//     // report: string;
//     comments: string[];
// }