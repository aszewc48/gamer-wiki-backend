const router = require("express").Router();
const axios = require('axios')
const GameEdit = require('../models/GameEdit.model')

router.put('/update/main-image/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {mainImage} = req.body
    GameEdit.findByIdAndUpdate(gameId,{mainImage})
        .then(mainImageData => res.json({message: 'POST success', game: mainImageData}))
        .catch(err => console.log(err))
})

module.exports = router