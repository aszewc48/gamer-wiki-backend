const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const developerSchema = new Schema ({
    developerName: String,
    gameEdit: {
        type: Schema.Types.ObjectId,
        ref: 'GameEdit'
    }
})

const Developer = mongoose.model('Developer', developerSchema)

module.exports = Developer