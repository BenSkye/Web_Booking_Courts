import mongoose from 'mongoose'
const { Schema } = mongoose

const fixedPackageScheduleSchema = new Schema(
  {
    centerId: {
      type: Schema.Types.ObjectId,
      ref: 'Center',
      required: true
    },
    courtId: {
      type: Schema.Types.ObjectId,
      ref: 'Court',
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    playDates: {
      type: [Date], // Array of Date objects
      required: true
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
      }
    ],
    bookingType: {
      type: String,
      enum: ['byday', 'bymonth'],
      default: 'byday',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'expired'],
      default: 'pending',
      required: true
    },
    invoiceId: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice'
    },
    totalPrice: {
      type: Number,
      required: true
    },
    notes: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('FixedPackageSchedule', fixedPackageScheduleSchema)
