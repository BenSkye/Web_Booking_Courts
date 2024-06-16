import mongoose from 'mongoose';
const { Schema } = mongoose;
const monthlyScheduleSchema = new Schema(
  {
    centerId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    courtId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    schedule: {
      type: [
        {
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
            enum: ['pending', 'confirmed', 'completed', 'cancelled', 'expired'],
            default: 'pending',
            required: true
          },
          tournamentId: {
            type: Schema.Types.ObjectId
          },
          invoiceId: {
            type: Schema.Types.ObjectId
          }
        }
      ],
      required: true
    }
  },
  { timestamps: true }
);