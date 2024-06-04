import mongoose from 'mongoose'
const { Schema } = mongoose
const bookingSchema = new Schema({})
const Booking = mongoose.model('Booking', bookingSchema)
export default Booking
