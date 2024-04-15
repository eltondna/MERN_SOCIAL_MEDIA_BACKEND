const express = require('express')
const {getRelationship, addRelationship,deleteRelationship} = require('../controllers/relationships')

const router = express.Router()

router.get('/', getRelationship)
router.post('/', addRelationship)
router.post('/unfollow', deleteRelationship)

module.exports = router