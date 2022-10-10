const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const timeSchema = new Schema ({
    release: String,
    releaseDate: {
        type: Schema.Types.ObjectId,
        ref: 'ReleaseDate'
    }
})

const Time = mongoose.model('Time', timeSchema)

module.exports = Time