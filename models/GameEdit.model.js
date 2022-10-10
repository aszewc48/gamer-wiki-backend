const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameEditSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    releaseDate: [{
        type: Schema.Types.ObjectId,
        ref: 'ReleaseDate'
        }],
    mainImage: String,
    developer: [{
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }],
    producer: [{
        type: Schema.Types.ObjectId,
        ref: 'Producer'
    }],
    genre: String,
    subGenre: String,
    content: [{
        type: Schema.Types.ObjectId,
        ref: 'Content'
    }],
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Images'
    }]
})

const GameEdit = mongoose.model('GameEdit', gameEditSchema)

module.exports = GameEdit