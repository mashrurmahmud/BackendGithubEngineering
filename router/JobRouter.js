import { Router } from "express";

const router = Router();



router.post('/create-job', (req, res) => {
    res.send('create-job')
})

router.get('/get-jobs', async(req, res) => {
    res.send('get-jobs')
})

router.get('/get-job/:id', async(req, res) => {
    res.send('get-job')
})

export default router