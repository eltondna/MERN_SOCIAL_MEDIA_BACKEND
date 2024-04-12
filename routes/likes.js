const express = require('express')
const {getLikes} = require('../controllers/likes')
const router = express.Router();


router.get('/', getLikes)

module.exports = router