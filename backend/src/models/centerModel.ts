import mongoose from 'mongoose'
const { Schema } = mongoose
const centerSchema = new Schema({})
const Center = mongoose.model('Booking', centerSchema)
export default Center
