
const path = require('path')
var Player = require("../models/player.js")

exports.menu = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
}

exports.score = (req, res, next) => {
    const pseudo = req.body.pseudo
    const score = req.body.score

    if (score > 0 && score <= 1000)
    {
        const new_player = new Player({
            pseudo : pseudo,
            score : score
        })
        new_player.save()
            .then(() => res.status(201).send())
            .catch(() => res.status(400).send())
    }
    res.status(400).send()
}

exports.leaderboard = (req, res, next) => {
    Player.aggregate([
    	{ '$group': 
		{ 
			'_id': '$pseudo', 
			'pseudo' : {'$first': '$pseudo'},
			'score' : {'$max': '$score'}
		}
	},
	{ '$sort' : { 'score' : -1 }},
	{ '$limit' : 10 }
    ])
    .then((players) => {
            if (!players)
                res.status(400).send()
            res.json(players)
        })
        .catch(() => res.status(400).send())
}
