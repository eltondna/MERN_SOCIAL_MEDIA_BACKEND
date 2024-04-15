const express = require('express')
const {getPosts, addPost, getUserPost} = require('../controllers/posts')
const router = express.Router();


router.post("/",getPosts);
router.post("/",addPost);
router.post("/:userId",getUserPost);

module.exports = router