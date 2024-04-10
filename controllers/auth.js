const db = require('../connect')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = (req,res)=>{
    // CHECK USER IF EXISTS

    const q = "SELECT * FROM users WHERE username = ?";
    const {username, password, email, name} = req.body;
    db.query(q,username,(err,data)=>{

        // CHECK USERS' existence
        if (err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"Err": err})
        }
        if (data.length)
            return res.status(StatusCodes.CONFLICT).json("User already exist")

        // CREATE USER
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt)
        const q = 'INSERT INTO users (`username`,`email`, `password`, `name`) VALUES (?,?,?,?)'

        db.query(q,[username,email,hashedPassword,name],(err,data)=>{
            if (err){
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
            }

            return res.status(StatusCodes.OK).json("User has been created")
        })

    })
}


const login = (req,res)=>{
    // CHECK YOUR EXIST
    const q = "SELECT * FROM users where username = ?";

    db.query(q,[req.body.username],(err,data)=>{
        if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
        if (data.length === 0)
            return res.status(StatusCodes.NOT_FOUND).json("User Not Found");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if (!checkPassword) 
            return res.status(StatusCodes.BAD_REQUEST).json("Username or Password incorrect");
        
         // Generate JWT
         const token = jwt.sign(
            {useId:data[0].id},
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )
        const {password, ...others} = data[0];

        res.status(200).json({token: token, data:{others}})
    })


}

module.exports = {register, login}