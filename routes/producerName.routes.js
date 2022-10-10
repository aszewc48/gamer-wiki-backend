const router = require("express").Router();
const axios = require('axios')
const Game = require('../models/Game.model')
const GameEdit = require('../models/GameEdit.model')
const Producer = require('../models/Producer.model')

router.put('/update/producer-name/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {producerName} = req.body
    console.log(producerName)
    Producer.findByIdAndUpdate(gameId,{
            producerName: producerName
    })
        .then(producerNameData => res.json({message: 'POST success', game: producerNameData}))
        .catch(err => console.log(err))
})

router.delete('/delete/producer-name/:gameId', (req,res,next) => {
    const {gameId} = req.params
    Producer.findByIdAndRemove(gameId)
    .then(deletedProducerName => {
        console.log(deletedProducerName)
        res.json({message: 'DELETE worked', gameId, producer: deletedProducerName})
    })
    .catch(err => console.log(err))
})

router.post('/create/producer-name', (req,res,next) => {
    const {producerName,gameId} = req.body
    let newProducerName
    console.log('Producer Name:',producerName)
    Producer.create({
        producerName,
        gameEdit: gameId
    })
    .then(createdProducerName => {
        console.log('Created Producer Data:',createdProducerName)
        newProducerName=createdProducerName
        return GameEdit.findByIdAndUpdate(gameId, {
            $push: {producer: createdProducerName._id}
        }, {new: true })
    })
            .then(updatedGame => {
                res.json({message: 'POST tasks works', producer: newProducerName, game: updatedGame})
            })
    .catch(err => console.log(err))

})

module.exports = router