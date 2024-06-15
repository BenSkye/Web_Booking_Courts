import mongoose from 'mongoose'
const { Schema } = mongoose
const timeslotSchema = new Schema({
  courtId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  slot: [
    {
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['available', 'booked', 'booking'], //booking là đang được book chưa thanh toán, booked là đã thanh toán
        default: 'available'
      }
    }
  ]
})
const TimeSlot = mongoose.model('TimeSlot', timeslotSchema)
export default TimeSlot
