const express = require('express')

const {getUser, updateUser} = require('../controllers/users')

const router = express.Router();

router.get('/find/:userId',getUser)
router.patch('/',updateUser)
module.exports = router