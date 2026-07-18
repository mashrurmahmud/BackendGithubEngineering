import { Router } from "express";
import job from "../model/JobModel.js";

const router = Router();



router.post('/create-job', (req, res) => {
    res.send('create-job')
})

router.get('/get-jobs', async(req, res) => {
    const jobs = await job.find();
    res.status(200).json({jobs})
})

router.get('/get-job/:id', async(req, res) => {
    const jobs = req.params.id;
    console.log(jobs)
    const jobhunter = await job.findById(jobs)
    res.status(200).json({jobhunter})
})

export default router