const router = require("express").Router();
const axios = require('axios')
const Game = require('../models/Game.model')
const GameEdit = require('../models/GameEdit.model')
const Content = require('../models/Content.model')

router.put('/update/content/:gameId', (req,res,next) => {
    const {gameId} = req.params
    const {header,description} = req.body
    console.log('Content:',header,description)
    Content.findByIdAndUpdate(gameId,{
            header,
            description
    })
        .then(contentData => res.json({message: 'POST success', game: contentData}))
        .catch(err => console.log(err))
})

router.post('/create/content', (req,res,next) => {
    const {header,description,gameId} = req.body
    let newContent
    console.log('Content:',header,description)
    Content.create({
        header,
        description,
        gameEdit: gameId
    })
    .then(createdContent => {
        console.log('Created URL Data:',createdContent)
        newContent=createdContent
        return GameEdit.findByIdAndUpdate(gameId, {
            $push: {content: createdContent._id}
        }, {new: true })
    })
            .then(updatedGame => {
                res.json({message: 'POST tasks works', content: newContent, game: updatedGame})
            })
    .catch(err => console.log(err))

})

module.exports = router