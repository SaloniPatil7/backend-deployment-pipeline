const jwt= new require("jsonwebtoken");//maintain a state
const secret= "saloniToken@#";

function setUser(user){
  return jwt.sign({
    _id:user._id,
    mail:user.mail
  },secret);
}

function getUser(token){
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;   // ✅ IMPORTANT: don't crash
  }
}
module.exports={
    setUser, getUser
}




