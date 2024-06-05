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
      required: true
    },
    services: {
      type: [String],
      default: []
    },
    rule: {
      type: String,
      default: ''
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
