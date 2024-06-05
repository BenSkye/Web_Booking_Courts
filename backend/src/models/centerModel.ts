import mongoose from 'mongoose'
const { Schema } = mongoose
const centerSchema = new Schema(
  {
    managerId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    centerName: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    openTime: {
      type: String,
      required: true
    },
    closeTime: {
      type: String,
      required: true
    },
    courtCount: {
      type: Number,
      required: true
    },
    images: {
      type: [String],
      default: []
    },
    services: {
      type: [String],
      default: []
    },
    rule: {
      type: String,
      default: ''
    },
    subscriptions: {
      type: [
        {
          _id: false,
          packageId: {
            type: Schema.Types.ObjectId,
            ref: 'Package',
            required: true
          },
          activationDate: {
            type: Date,
            required: true
          },
          expiryDate: {
            type: Date,
            required: true
          }
        }
      ],
      default: []
    },
    status: {
      type: String,
      default: 'pending'
    }
  },
  { timestamps: true }
)
const Center = mongoose.model('Center', centerSchema)
export default Center
