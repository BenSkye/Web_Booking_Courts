import mongoose from 'mongoose'
const { Schema } = mongoose
const timeslotSchema = new Schema({})
const TimeSlot = mongoose.model('Booking', timeslotSchema)
export default TimeSlot
