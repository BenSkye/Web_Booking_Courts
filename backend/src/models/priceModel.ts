import mongoose from 'mongoose'
const { Schema } = mongoose
const priceSchema = new Schema(
  {
    centerId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    scheduleType: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
const Price = mongoose.model('Price', priceSchema)
export default Price
