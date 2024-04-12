const db = require('../connect')
const moment = require('moment')
const getPosts = (req,res)=>{

    const q = `SELECT p.*,u.id as userId, name, profilePic FROM post AS p JOIN users As u ON (u.id = p.user_id)
    JOIN relationship AS r ON (p.user_id = r.followed_id AND r.follower_id = ?) OR p.user_id = ? 
    ORDER BY p.createDate DESC`

    const userId = req.userId;
    console.log(userId)

    db.query(q,[userId,userId],(err,data) =>{
        if (err) return res.status(500).json(err)
        else res.status(200).json(data)
    })
}


const addPost = (req,res)=>{
    const q = "INSERT INTO post (`desc`,`img`, `createDate`,`user_id`) VALUES (?) ";
    const values = [
        req.body.desc,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.userId

    ]
    db.query(q,[values], (err,data)=>{
        if (err) return res.status(500).json(err)
        else res.status(200).json("Post has been created")
    })
}

module.exports = {getPosts, addPost}