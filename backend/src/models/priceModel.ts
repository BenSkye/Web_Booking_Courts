import mongoose from 'mongoose'
const { Schema } = mongoose
const priceSchema = new Schema({})
const Price = mongoose.model('Booking', priceSchema)
export default Price
