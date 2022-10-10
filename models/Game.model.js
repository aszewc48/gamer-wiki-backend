const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    releaseDate: [{
        platforms: String,
        time: [{
            release: String
        }]
        }],
    mainImage: String,
    developer: [{
        developerName: String
    }],
    producer: [{
        producerName: String
    }],
    genre: String,
    subGenre: String,
    content: [{
        header: String,
        description: String
    }],
    images: [{
        url: String
    }]
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game