import mongoose from "mongoose";





const jobSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    skills:{
        type:[String],
        required: true
    },
    logo:{
        type: String,
        required: true
    },
    benefits:{
        type:[String],
        required: true
    },
    posted:{
        type: Date,
        default: Date.now
    }
   
},{
    timestamps: true
})


const job = mongoose.model('Job', jobSchema);

export default job;