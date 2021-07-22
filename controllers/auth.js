const User = require("../models/User")
const asyncHandler = require("../middleware/async")

exports.register = asyncHandler(async(req,res,next) => {
   const { name,email,password,role} = req.body;

   //create user
   const user = await User.create({
       name,
       email,
       password,
       role
   });

   //create token
   const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token}) 
})

exports.login = asyncHandler(async(req,res,next) => {
  const { email,password } = req.body;

  //validate email and password
  if(!email || !password) {
    return next('please provide an email')
  }

  //check for user
  const user = await User.findOne({email}).select('+password')

  if(!user){
    return next("invalid credentials")
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if(!isMatch){
    return next("invalid credentials")
  }

  sendTokenResponse(user,200,res)
})


//get token from model , create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPORE * 24 * 60 * 60 * 1000),
    httpOnly : true
  };

  if(process.env.NODE_ENV == "production") {
    options.secure = true;
  }

  res.status(statusCode)
    .cookie('token', token ,options)
    .json({ success:true, token})
}