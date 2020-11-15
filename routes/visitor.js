const express = require('express')
var visitor = require("../controllers/visitors")

const router = express.Router()

router.post('/score', visitor.score)
router.get('/leaderboard', visitor.leaderboard)
router.get('/*', visitor.menu)


module.exports = router