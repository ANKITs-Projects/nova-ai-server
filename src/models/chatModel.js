const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String   // first message as title
    }
}, { timestamps: true })

module.exports = mongoose.model("Chat", chatSchema)