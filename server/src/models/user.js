const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "first name is required and is of type string"],
    },
    last_name: {
        type: String,
        required: [true, "last name is required and is of type string"],
    },
    username: {
        type: String,
        required: [true, "user name is required and is of type string"],
    }, 
    email: {
        type: String,
        required: [true, "email is required and is of type string"],
    },
    password: {
        type: String,
        required: [true, "password is required and is of type string"],
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    },
    images: {
        type: [Schema.Types.ObjectId],
        ref: 'Image'
    },
    recipes: {
        type: [Schema.Types.ObjectId],
        ref: 'recipe'
    },
    tssci: {
        type: Boolean,
        default: false
    }
});
 

module.exports = mongoose.model("User", UserSchema);