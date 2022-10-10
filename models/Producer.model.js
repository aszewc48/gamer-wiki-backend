const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const producerSchema = new Schema ({
    producerName: String,
    gameEdit: {
        type: Schema.Types.ObjectId,
        ref: 'GameEdit'
    }
})

const Producer = mongoose.model('Producer', producerSchema)

module.exports = Producer