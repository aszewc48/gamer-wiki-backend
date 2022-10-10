const router = require("express").Router();
const axios = require('axios')
const Game = require('../models/Game.model')
const GameEdit = require('../models/GameEdit.model')
const Producer = require('../models/Producer.model')
const Developer = require('../models/Developer.model')
const ReleaseDate = require('../models/ReleaseDate.model')
const Time = require('../models/Time.model')
const Images = require('../models/Images.model')
const Content = require('../models/Content.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post('/create', (req,res,next) => {
  const {title,releaseDate,mainImage,developer,producer,genre,subGenre,content,images} = req.body
  GameEdit.findOne({title})
    .then(foundUser => {
      if(foundUser){
        res.json({ error: 'Game already exists, try searching and editing instead.'})
        return;
      }})
  GameEdit.create({
    title,
    mainImage,
    genre,
    subGenre,
  })
    .then(gameData => res.json({message: 'POST success', game: gameData}))
    .catch(err => console.log(err))
    })
  
    router.get('/gamebox', (req,res,next) => {
      GameEdit.find()
        .then(gameBoxData => {
          console.log(gameBoxData)
          res.json({message: 'GET success', games: gameBoxData})
        })
        .catch(err => console.log('Gamebox Database Error', err))
    })
    
    router.get('/game/:gameId', (req,res,next) => {
      const {gameId} = req.params
      GameEdit.findById(gameId)
        .populate({
          path: 'releaseDate',
          populate: {
            path: 'time'
          }
        })
        .populate('developer')
        .populate('producer')
        .populate('content')
        .populate('images')
        .then(foundGameData => {
          console.log(foundGameData)
          res.json({message: 'GET success', gameId, foundGameData})
        })
        .catch(err => console.log('Error getting single game data', err))
    })

    router.put('/update/:gameId', (req,res,next) => {
      const{gameId} = req.params
      const {title,mainImage,genre,subGenre} = req.body
      Game.findByIdAndUpdate(gameId,{
        title,
        mainImage,
        genre,
        subGenre,
      })
        .then(gameData => res.json({message: 'POST success', game: gameData}))
        .catch(err => console.log(err))
        })


module.exports = router;
