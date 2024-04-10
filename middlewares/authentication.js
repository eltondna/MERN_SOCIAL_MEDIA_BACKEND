const jwt = require('jsonwebtoken')
const db = require('../connect')
const {StatusCodes} = require('http-status-codes')

const auth = (req, res,next)=>{
    const authHeader = req.headers.authorization
    console.log(authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json("Authentication Error")
    }
    const token = authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload)
        req.user = payload.userID;
        next();
    }catch (err){
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).json("Authentication Error")
    }

}