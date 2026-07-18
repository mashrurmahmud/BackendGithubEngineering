import dotenv from 'dotenv';

dotenv.config()

export const protect = async(req, res, next)=>{
    const token = req.cookies.token;
    console.log(token)
    if(!token){
        return res.status(401).json({message: "Unauthorized"})

    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await decode._id;
    const holdit = await User.findById(req.user);
    console.log("this is user", req.user)
    console.log(req.user)
    next();
}





// just for practing to add cookie
export const protectForDashboard = async(req, res, next)=>{
    const token = res.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    req.user =  decode._id;
    
    
    
    next();
}