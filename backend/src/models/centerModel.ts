import mongoose from 'mongoose'
const { Schema } = mongoose
const centerSchema = new Schema(
  {
    managerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
      required: true
    },
    imagesLicense: {
      type: [String],
      required: true
    },
    services: {
      type: [String],
      required: true
    },
    rule: {
      type: String,
      required: true
    },
    subscriptions: {
      type: [
        {
          _id: false,
          packageId: {
            type: Schema.Types.ObjectId,
            ref: 'CenterPackage',
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
    price: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Price',
          required: true
        }
      ]
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'active', 'expired', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
)
const Center = mongoose.model('Center', centerSchema)
export default Center
