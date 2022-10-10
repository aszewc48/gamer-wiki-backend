const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const releaseDateSchema = new Schema ({
    platform: String,
    time: [{
        type: Schema.Types.ObjectId,
        ref: 'Time'
    }],
    gameEdit: {
        type: Schema.Types.ObjectId,
        ref: 'GameEdit'
    }
})

const ReleaseDate = mongoose.model('ReleaseDate', releaseDateSchema)

module.exports = ReleaseDate