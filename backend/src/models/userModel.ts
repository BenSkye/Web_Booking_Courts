import mongoose from 'mongoose'
const { Schema } = mongoose
const userSchema = new Schema({})
const User = mongoose.model('Booking', userSchema)
export default User
