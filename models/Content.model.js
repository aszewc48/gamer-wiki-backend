const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const contentSchema = new Schema ({
    header: String,
    description: String,
    // links: String,
    gameEdit: {
        type: Schema.Types.ObjectId,
        ref: 'GameEdit'
    }
})

const Content = mongoose.model('Content', contentSchema)

module.exports = Content