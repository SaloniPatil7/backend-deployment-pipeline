const { getUser } = require('../utils/auth.js'); 

const auth = (req, res, next) => {
    const userID = req.cookies.uid;
    if (!userID) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = getUser(userID);

    if (!user) {
         res.clearCookie("uid");   
        return res.status(401).json({ message: "Session expired, login again" });
    }

    req.user = user;
    next();
};

module.exports = auth;