const router = require("express").Router();
const axios = require('axios')
const GameEdit = require('../models/GameEdit.model')
const Content = require('../models/Content.model')
const Developer = require('../models/Developer.model')
const Images = require('../models/Images.model')
const ReleaseDate = require('../models/ReleaseDate.model');
const Time = require("../models/Time.model");
const Producer = require("../models/Producer.model");

router.delete('/delete/all/:gameId', (req,res,next) => {
    const {gameId} = req.params
    GameEdit.findByIdAndRemove(gameId)
    .then(deletedGame => {
        console.log(deletedGame)
        ReleaseDate.deleteMany({gameEdit: gameId}).then(() => {})
        Time.deleteMany({gameEdit: gameId}).then(() => {})
        Producer.deleteMany({gameEdit: gameId}).then(() => {})
        Developer.deleteMany({gameEdit: gameId}).then(() => {})
        Images.deleteMany({gameEdit: gameId}).then(() => {})
        Content.deleteMany({gameEdit: gameId}).then(() => {})
        res.json({message: 'DELETE projects/:projectId worked', gameId, game: deletedGame})
    })
    .catch(err => console.log(err))
})

module.exports = router