const express = require('express')
const {getLikes, addLike,deleteLike} = require('../controllers/likes')
const router = express.Router();


router.get('/', getLikes)
router.post('/', addLike)
router.post('/dislike', deleteLike)

module.exports = router