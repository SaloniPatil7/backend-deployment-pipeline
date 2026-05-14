const User = require('../models/user.js');
const asyncWrap = require('../utils/handleTryCatch.js');
const customError = require('../utils/customErrors.js');
const { setUser, getUser } = require('../utils/auth.js');



exports.SignUp = asyncWrap(async (req, res) => {
    if (!req.body.mail) {
        throw new customError("email is required", 400);
    }
    const data = new User(req.body);
    const user = await data.save();
    res.status(201).json(user);
})


exports.Login = asyncWrap(async (req, res) => {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail, password });
    if (!user) {
        throw new customError("Invalid mail or password",404);
    }
    const token=setUser(user);
    res.cookie("uid", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    });

    res.status(200).json(user);
})