const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const imagesSchema = new Schema ({
    url: String,
    gameEdit: {
        type: Schema.Types.ObjectId,
        ref: 'GameEdit'
    }
})

const Images = mongoose.model('Images', imagesSchema)

module.exports = Images