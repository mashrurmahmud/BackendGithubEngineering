import { Router } from "express";
import { protect, protectForDashboard } from "../privateRoute/protectInfo.js";
import Application from "../model/ApplicationModel.js";

const router = Router();

router.post('/apply-job', protectForDashboard, async(req, res) => {
    const {jobId} = req.body;
    const userId = req.user;
    console.log("this is userID", userId + ' ' + "this is jobID", jobId)
    const applied_exist = await Application.findOne({jobId, userId});
    if(applied_exist){
        return res.status(400).json({message:"You already applied for this job", success: false});
    }
    const application = await Application.create({jobId, userId});
    res.status(201).json({message:"You applied for this job", success: true, application});
    
    
    
})

router.get('/get-applications',protect, async(req, res) => {
  
   
    const applications = await Application.find({}).populate("jobId", "title company salary type ").populate("userId", "email");
    res.status(200).json({message:"You applied for this job", success: true, applications});
    
})

// router.get('/get-applications',protect, async(req, res) => {
//     // const userId = req.user?._id;
//     // const applications = await Application.find({userId});
//     // res.status(200).json({message:"You applied for this job", success: true, applications});
    
// })




export default router