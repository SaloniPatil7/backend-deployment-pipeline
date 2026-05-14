const User= require('../controllers/user.js');

const express= require('express');
const router= express.Router();

router.post('/signup', User.SignUp);
router.post('/login',User.Login);



module.exports= router;
