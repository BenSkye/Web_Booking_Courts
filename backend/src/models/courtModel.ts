import mongoose from 'mongoose'
const { Schema } = mongoose
const courtSchema = new Schema({
  courtNumber: {
    type: Number,
    required: true
  },
  centerId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})
const Court = mongoose.model('Court', courtSchema)
export default Court
