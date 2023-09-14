import * as mongodb from "mongodb";
import * as crypto from "crypto";
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


 
// export interface User {
//     _id?: mongodb.ObjectId;
//     name: string;
//     username: string; 
//     email: string;
//     password: string;
//     comments: string[];
//     images: string[];
//     recipes: string[];
//     tssci: boolean; 
// }

var userSchema = new mongoose.Schema({
    _id: {
        type: mongodb.ObjectId
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    comments: {
        type: [String],
    },
    images: {
        type: [String],
    },
    recipes: {
        type: [String],
    },
    tssci: {
        type: Boolean,
    }, 
});

userSchema.methods.setPassword = function(password:any){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
  userSchema.methods.validPassword = function(password:any) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: expiry.getTime() / 1000,
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };
  
  exports.User = mongoose.model('User', userSchema);