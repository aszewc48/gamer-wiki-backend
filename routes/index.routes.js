const router = require("express").Router();
const axios = require('axios')
const Game = require('../models/Game.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post('/create', (req,res,next) => {
  const {title,releaseDate,platforms,mainImage,developer,producer,genre,subGenre,content,images} = req.body
  Game.findOne({title})
    .then(foundUser => {

      if(foundUser){
        res.json({ error: 'username already exists '})
        return;
      }})
  Game.create({
    title,
    releaseDate,
    platforms,
    mainImage,
    developer,
    producer,
    genre,
    subGenre,
    content,
    images
  })
    .then(gameData => res.json({message: 'POST success', game: gameData}))
    .catch(err => console.log(err))
    })
  
    router.get('/gamebox', (req,res,next) => {
      Game.find()
        .then(gameBoxData => {
          console.log(gameBoxData)
          res.json({message: 'GET success', games: gameBoxData})
        })
        .catch(err => console.log('Gamebox Database Error', err))
    })

module.exports = router;
