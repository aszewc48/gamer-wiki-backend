const router = require("express").Router();
const axios = require('axios')
const GameEdit = require('../models/GameEdit.model')

router.put('/update/genre/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {genre} = req.body
    GameEdit.findByIdAndUpdate(gameId,{genre})
        .then(genreData => res.json({message: 'POST success', game: genreData}))
        .catch(err => console.log(err))
})

module.exports = router