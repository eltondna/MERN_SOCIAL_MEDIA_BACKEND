const db = require('../connect');


const getUser = (req, res)=>{
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = ?"

    db.query(q, [userId], (err,data)=>{
        if (err) 
            return res.status(500).json(err);
        else if(data.length <= 0) {
            res.status(404).json("No Such User")

        }
        else {
            // JS method Separate password from userInfo
            const {password, ...info }  = data[0]
            return res.status(200).json(info)
        }
    })
}


const updateUser = (req, res)=>{
    const q = "UPDATE users SET `name` = ?, `website` = ?, `city` = ? WHERE id= ?"
    const values = [
        req.body.name,
        req.body.website,
        req.body.city,
        req.userId
    ]
    db.query(q,values,(err,data)=>{
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("Updated!")
        return res.status(403).json("You can update only your profile")
    })
}

module.exports = {getUser, updateUser}



