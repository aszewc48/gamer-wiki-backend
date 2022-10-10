const express = require('express')
const Game = require('../models/Game.model')
const GameEdit = require('../models/GameEdit.model')
const router = express.Router()
const ReleaseDate = require('../models/ReleaseDate.model')
const Time = require('../models/Time.model')

router.post('/create/platform', (req,res,next) => {
    const {platform,gameId} = req.body
    let newReleaseDate
    ReleaseDate.create({
        platform,
        gameEdit: gameId
    })
    .then(createdReleaseDate => {
        console.log(newReleaseDate)
        newReleaseDate=createdReleaseDate
        return GameEdit.findByIdAndUpdate(gameId, {
            $push: {releaseDate: createdReleaseDate._id}
        }, {new: true })
    })
            .then(updatedGame => {
                res.json({message: 'POST tasks works', releaseDate: newReleaseDate, game: updatedGame})
            })
    .catch(err => console.log(err))

})

router.put('/update/platform/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {platform} = req.body
    console.log('Platform:',platform)
    ReleaseDate.findByIdAndUpdate(gameId,{
            platform
    })
        .then(platformData => res.json({message: 'POST success', game: platformData}))
        .catch(err => console.log(err))
})

router.post('/create/release', (req,res,next) => {
    const {release,gameId} = req.body
    let newTime
    Time.create({
        release,
        releaseDate: gameId
    })
    .then(createdTime => {
        console.log(newTime)
        newTime=createdTime
        return ReleaseDate.findByIdAndUpdate(gameId, {
            $push: {time: createdTime._id}
        }, {new: true })
    })
            .then(updatedGame => {
                res.json({message: 'POST tasks works', time: newTime, game: updatedGame})
            })
    .catch(err => console.log(err))
})

router.put('/update/release/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {release} = req.body
    console.log('Release:',release)
    Time.findByIdAndUpdate(gameId,{
            release
    })
        .then(releaseData => res.json({message: 'POST success', game: releaseData}))
        .catch(err => console.log(err))
})

module.exports = router