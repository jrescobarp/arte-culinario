const User = require("../models/user");
const asyncHandler = require("express-async-handler");


exports.register_user = asyncHandler(async(req, res, next) => {
    console.log("REQ: ", req);
    // res.status(200).send(req);
});