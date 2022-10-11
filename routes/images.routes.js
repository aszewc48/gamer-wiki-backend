const router = require("express").Router();
const axios = require('axios')
const Game = require('../models/Game.model')
const GameEdit = require('../models/GameEdit.model')
const Images = require('../models/Images.model')

router.put('/update/url/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {url} = req.body
    console.log('URL:',url)
    Images.findByIdAndUpdate(gameId,{
            url
    })
        .then(urlData => res.json({message: 'POST success', game: urlData}))
        .catch(err => console.log(err))
})

router.delete('/delete/url/:gameId', (req,res,next) => {
    const {gameId} = req.params
    Images.findByIdAndRemove(gameId)
    .then(deletedUrl => {
        console.log(deletedUrl)
        res.json({message: 'DELETE worked', gameId, images: deletedUrl})
    })
    .catch(err => console.log(err))
})

router.post('/create/url', (req,res,next) => {
    const {url,gameId} = req.body
    let newUrl
    console.log('URL:', url)
    Images.create({
        url,
        gameEdit: gameId
    })
    .then(createdUrl => {
        console.log('Created URL Data:',createdUrl)
        newUrl=createdUrl
        return GameEdit.findByIdAndUpdate(gameId, {
            $push: {images: createdUrl._id}
        }, {new: true })
    })
            .then(updatedGame => {
                res.json({message: 'POST tasks works', Images: newUrl, game: updatedGame})
            })
    .catch(err => console.log(err))

})

module.exports = router