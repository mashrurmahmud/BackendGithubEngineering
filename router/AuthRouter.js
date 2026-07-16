import { Router } from "express";
import User from "../model/AuthModel.js";

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
    const user = await User.create({name, username, email, password})
    
    res.status(201).json({user, success: true, message: "User created successfully"})
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "All fields are required", success: false})
    }
    const exist = await User.findOne({email})
    if(!exist){
        return res.status(400).json({message: "User does not exist", success: false})
    }
    if(exist.password !== password){
        return res.status(400).json({message: "Incorrect password", success: false})
    }
    res.status(200).json({user: exist, success: true, message: "User logged in successfully"})

})

export default router