const db = require('../connect')
const getRelationship = (req,res)=>{
    const q = "SELECT follower_id FROM relationship WHERE followed_id = ? ";
    db.query(q, [req.query.followedId], (err,data)=>{
        if (err) return res.status(500).json(err)
        
        else  res.status(200).json(data.map(relationship=>relationship.follower_id))
    }) 
}

const addRelationship = (req, res)=>{
    const q = "INSERT INTO relationship (`follower_id`, `followed_id`) VALUES (?,?)";

    const values = [
        req.userId,
        req.body.userID
    ]
    db.query(q, values, (err,data)=>{
        if (err) return res.status(500).json(err)
        else res.status(200).json("You have followed the user")
    }) 
};

const deleteRelationship = (req, res) =>{
    const q = "DELETE FROM relationship WHERE follower_id = ? AND followed_id = ?";
    const values = [
        req.userId,
        req.body.userId
    ]

    db.query(q, values, (err,data)=>{
        if (err) return res.status(500).json(err)
        else  res.status(200).json("You have unfollowed")
    }) 
};

module.exports = {getRelationship, addRelationship, deleteRelationship}