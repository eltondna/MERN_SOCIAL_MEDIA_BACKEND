const db = require('../connect')
const getLikes = (req,res)=>{
    const q = "SELECT user_id FROM likes WHERE post_id = ?";
    db.query(q, [req.query.postId], (err,data)=>{
        if (err) return res.status(500).json(err)
        else  res.status(200).json(data.map(like=>like.user_id))
    }) 

}

const addLike = (req, res)=>{
    const q = "INSERT INTO likes (`user_id`,`post_id`) VALUES (?,?)";

    const values = [
        req.userId,
        req.body.postId
    ]
    db.query(q, values, (err,data)=>{
        if (err) return res.status(500).json(err)
        else  res.status(200).json("Post has been liked")
    }) 
};

const deleteLike = (req, res) =>{
    const q = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";

    const values = [
        req.userId,
        req.body.postId
    ]

    db.query(q, values, (err,data)=>{
        if (err) return res.status(500).json(err)
        else  res.status(200).json("Post has been disliked")
    }) 
};

module.exports = {getLikes, addLike, deleteLike}