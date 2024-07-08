import mongoose from 'mongoose'
const { Schema } = mongoose

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const MessageModel = mongoose.model('Messages', messageSchema)
export default MessageModel