const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Order = require("../models/Order");
const Feedback = require("../models/Feedback");

const router = express.Router();

/* ===========================
   REGISTER
=========================== */

router.post("/register", async (req,res)=>{

try{

const {username,email,password} = req.body;

if(!username || !email || !password){
return res.status(400).json({
success:false,
message:"All fields are required"
});
}

const usernameRegex =
/^[a-zA-Z0-9]{4,20}$/;

const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if(!usernameRegex.test(username)){
return res.status(400).json({
success:false,
message:"Username must be 4-20 characters and alphanumeric"
});
}

if(!emailRegex.test(email)){
return res.status(400).json({
success:false,
message:"Invalid email format"
});
}

if(!passwordRegex.test(password)){
return res.status(400).json({
success:false,
message:"Password must contain uppercase, lowercase, number and special character"
});
}

const existingUser =
await User.findOne({username});

if(existingUser){
return res.status(400).json({
success:false,
message:"Username already exists"
});
}

const existingEmail =
await User.findOne({email});

if(existingEmail){
return res.status(400).json({
success:false,
message:"Email already registered"
});
}

const hashedPassword =
await bcrypt.hash(password,10);

const user = new User({
username,
email,
password:hashedPassword
});

await user.save();

res.status(201).json({
success:true,
message:"Registration Successful"
});

}
catch(err){

console.error(err);

res.status(500).json({
success:false,
message:err.message
});

}

});

/* ===========================
   LOGIN
=========================== */

router.post("/login", async(req,res)=>{

try{

const {username,password} = req.body;

const user =
await User.findOne({username});

if(!user){
return res.status(400).json({
success:false,
message:"Invalid Username"
});
}

const isMatch =
await bcrypt.compare(
password,
user.password
);

if(!isMatch){
return res.status(400).json({
success:false,
message:"Invalid Password"
});
}

res.json({
success:true,
message:"Login Successful",
user:{
id:user._id,
username:user.username,
email:user.email
}
});

}
catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

});

/* ===========================
   GET USERS
=========================== */

router.get("/users", async(req,res)=>{

const users =
await User.find();

res.json(users);

});

/* ===========================
   DELETE USER
=========================== */

router.delete("/users/:id", async(req,res)=>{

await User.findByIdAndDelete(
req.params.id
);

res.json({
success:true,
message:"User Deleted"
});

});

/* ===========================
   PLACE ORDER
=========================== */

router.post("/place-order", async(req,res)=>{

const order =
new Order(req.body);

await order.save();

res.json({
success:true,
orderId:order._id
});

});

/* ===========================
   GET ORDERS
=========================== */

router.get("/orders", async(req,res)=>{

const orders =
await Order.find();

res.json(orders);

});

/* ===========================
   FEEDBACK
=========================== */

router.post("/feedback", async(req,res)=>{

const existingFeedback =
await Feedback.findOne({
userId:req.body.userId
});

if(existingFeedback){

return res.status(400).json({
success:false,
message:"Feedback already submitted"
});

}

const feedback =
new Feedback(req.body);

await feedback.save();

res.json({
success:true,
message:"Feedback Saved Successfully"
});

});

/* ===========================
   CHECK FEEDBACK
=========================== */

router.get("/check-feedback/:userId",
async(req,res)=>{

const feedback =
await Feedback.findOne({
userId:req.params.userId
});

res.json({
submitted:!!feedback
});

});

module.exports = router;
