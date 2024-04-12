const db = require('../connect')
const moment = require('moment')

const getComments = (req,res)=>{
    const q =`SELECT c.*, u.id as userId, name, profilePic FROM comments AS c JOIN users as u ON (u.id = c.user_id) 
    WHERE c.post_id = ? 
    ORDER BY c.createDate DESC
    `;
    db.query(q,[req.query.postId], (err,data)=>{
        if (err) return res.status(500).json(err)
        else res.status(200).json(data)
    })
}

const addComment = (req, res) =>{
    const q = "INSERT INTO comments (`desc`, `createDate`, `user_id`, `post_id`) VALUES (?)"
    const data = [
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.userId,
        req.body.postId
    ]
    db.query(q,[data], (err,data)=>{
        if (err) return res.status(500).json(err)
        else res.status(200).json("Comment has been created")
    })

}


module.exports = {
    getComments,
    addComment
}