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