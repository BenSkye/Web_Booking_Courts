import mongoose from 'mongoose'
const { Schema } = mongoose
const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    centerId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    courtId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    },
    bookingType: {
      type: String,
      default: 'byday',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'expired', 'disable'],
      default: 'pending',
      required: true
    },
    tournamentId: {
      type: Schema.Types.ObjectId
    },
    invoiceId: {
      type: Schema.Types.ObjectId
    }
  },
  { timestamps: true }
)
const Booking = mongoose.model('Booking', bookingSchema)
export default Booking
