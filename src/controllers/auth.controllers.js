const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
/*
@desc Register a new user
@route POST /api/auth/register
@access Public
*/
async function userRegisterController(req, res){
    const {email, password, name}= req.body;
    const isExists = await userModel.findOne({
        email: email
    })
    if(isExists){
        return res.status(400).json({
            message: "User already exists",
            status: "failed"
        })
    }
    const user = await userModel.create({email, password, name});
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"});
    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        status: "success",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
        }, 
        token
    })
}
/*
@desc Login a user
@route POST /api/auth/login
@access Public
*/
async function userLoginController(req, res){
 const {email, password} = req.body;
 const user = await userModel.findOne({email}).select("+password");
 if(!user){
    return res.status(401).json({
        message: "Email or Password is Invalid",
        status: "failed"
    })
 }
 const isValidPassword = await user.comparePassword(password);
 if(!isValidPassword){
    return res.status(401).json({
        message: "Email or Password is Invalid",
        status: "failed"
    })
 }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"});
    res.cookie("token", token);
    
    res.status(200).json({
        message: "User logged in successfully",
        status: "success",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
        },
        token
    })
}
  
module.exports= {userRegisterController, userLoginController};