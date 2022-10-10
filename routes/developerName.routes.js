const router = require("express").Router();
const axios = require('axios')
const Game = require('../models/Game.model')
const GameEdit = require('../models/GameEdit.model')
const Developer = require('../models/Developer.model')

router.put('/update/developer-name/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {developerName} = req.body
    console.log('Developer Name:',developerName)
    Developer.findByIdAndUpdate(gameId,{
            developerName: developerName
    })
        .then(developerNameData => res.json({message: 'POST success', game: developerNameData}))
        .catch(err => console.log(err))
})

router.post('/create/developer-name', (req,res,next) => {
    const {developerName,gameId} = req.body
    let newDeveloperName
    console.log('Developer Name:', developerName)
    Developer.create({
        developerName,
        gameEdit: gameId
    })
    .then(createdDeveloperName => {
        console.log('Created Developer Data:',createdDeveloperName)
        newDeveloperName=createdDeveloperName
        return GameEdit.findByIdAndUpdate(gameId, {
            $push: {developer: createdDeveloperName._id}
        }, {new: true })
    })
            .then(updatedGame => {
                res.json({message: 'POST tasks works', developer: newDeveloperName, game: updatedGame})
            })
    .catch(err => console.log(err))

})

module.exports = router