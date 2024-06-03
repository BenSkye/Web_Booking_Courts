import mongoose from 'mongoose'
const { Schema } = mongoose
const courtSchema = new Schema({})
const Court = mongoose.model('Booking', courtSchema)
export default Court
