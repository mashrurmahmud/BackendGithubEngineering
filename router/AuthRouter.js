import { Router } from "express";
import User from "../model/AuthModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const router = Router();


router.post('/register', async(req, res) => {
    
    const {name, username, email, password} = req.body;
    console.log(name, username)

    if(!name || !username || !email || !password){
        return res.status(400).json({message: "All fields are required", success: false})
    }
    const exist = await User.findOne({email})
    if(exist){
        return res.status(400).json({message: "User already exist", success: false})
    }
    const token = await jwt.sign({email, password}, process.env.JWT_SECRET, {expiresIn: "1d"})
    const user = await User.create({name, username, email})
    res.cookie('token', token, {httpOnly: true,
        
        secure: true
    })
    res.status(201).json({user, success: true, message: "User created successfully"})
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    console.log(email, password)
    if(!email || !password){
        return res.status(400).json({message: "All fields are required", success: false})
    }
    const exist = await User.findOne({email})
    const comparepassword = await bcrypt.compare(password, exist.password);
    if(!comparepassword){
        return res.status(400).json({message: "Invalid credentials", success: false})
    }

    const token = await jwt.sign({_id:exist?._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie('token', token,{
        httpOnly: true,
       
        secure: true,
        sameSite: "none"
    })
   
    res.status(200).json({user: exist,token, success: true,  message: "User logged in successfully"})

})

router.post('/logout', async(req, res) => {
    
    res.clearCookie('token',{
         httpOnly: true,
        
        secure: true,
        sameSite: "none"
    })
     res.status(200).json({message: "User logged out successfully", success: true})
})

router.get('/userProfile', async(req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decode._id);
    res.status(200).json({user, success: true})
})

export default router