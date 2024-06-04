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
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    cheduleType: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
const Price = mongoose.model('Price', priceSchema)
export default Price
