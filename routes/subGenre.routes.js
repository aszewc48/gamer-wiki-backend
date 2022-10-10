const router = require("express").Router();
const axios = require('axios')
const GameEdit = require('../models/GameEdit.model')

router.put('/update/sub-genre/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {subGenre} = req.body
    GameEdit.findByIdAndUpdate(gameId,{subGenre})
        .then(subGenreData => res.json({message: 'POST success', game: subGenreData}))
        .catch(err => console.log(err))
})

module.exports = router