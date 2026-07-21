import { Router } from "express";
import job from "../model/JobModel.js";
import { version } from "mongoose";

const router = Router();



router.post('/create-job', (req, res) => {
   
    const {title, company, location, type, salary, description, experience} = req.body;
    
   
    const jobhunter = job.create({title, company, location, type, salary, experience, description});
    res.status(201).json({jobhunter})
})

router.get('/get-jobs', async(req, res) => {
    const jobs = await job.find();
    res.status(200).json({jobs})
})

router.get('/get-job', async(req, res) => {
    const jobs = await job.find();
    res.status(200).json({jobs})
})

router.get('/sort-job', async(req, res)=>{
    
     const {sort} = req.query;
    
     const jobs = await job.find()
     jobs.sort((a,b)=>{
        const salaryA = a.salary.replace("/\$/g", "").split('-')[0].trim();
        console.log("this is salarya", salaryA)
        const salaryB = b.salary.replace("/\$/g", "").split("-")[0].trim();
        console.log("thsi is salaryb", salaryB)

        return sort === "salaryHigh" ? salaryA - salaryB : salaryB - salaryA
     })

     res.status(200).json({jobs})
    
})

router.get('/get-job/:id', async(req, res) => {
    const jobs = req.params.id;
    
    const jobhunter = await job.findById(jobs)
    res.status(200).json({jobhunter})
})

export default router