const User = require("../models/user");
const asyncHandler = require("express-async-handler");


exports.get_user_info = asyncHandler(async( req, res, next) => { 
    // console.log("REQUSER",req.user);
    res.send(req.user);
});

exports.register_user = asyncHandler(async(req, res, next) => {
    const { email, username, password, first_name, last_name } = req.body;
    const user = new User({email,username, first_name, last_name});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err =>{
        if(err) return next(err);
        const response = new User({email,username, first_name, last_name});
        req.flash('success', "Aprendamos a cocinar!");
        res.send(response);
    });
});


exports.login = asyncHandler(async(req, res, next) => {
    const { email, username, first_name, last_name } = req.user;
    const user = new User({ email,username, first_name, last_name });
    res.send(user);
});


exports.logout = asyncHandler(async (req, res, next) => {
    req.logout(function(err){
        if(err){return next(err)};
    });
    res.send(req.user);
});