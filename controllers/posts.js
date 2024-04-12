const db = require('../connect')
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
    const q = `INSERT INTO post ("desc","img", "createDate","userId) VALUES ? `;
    const values = [
        req.body.desc,
        req.body.img
    ]
    db.query(q,values, (err,data)=>{
        if (err) return res.status(500).json(err)
        else res.status(200).json(data)
    })
}

module.exports = {getPosts, addPost}