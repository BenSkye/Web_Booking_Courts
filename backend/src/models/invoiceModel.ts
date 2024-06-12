import mongoose from 'mongoose'
const { Schema } = mongoose
const invoiceSchema = new Schema(
  {
    price: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending', required: true },
    invoiceFor: { type: String, required: true }
  },
  { timestamps: true }
)
const Invoice = mongoose.model('Invoice', invoiceSchema)
export default Invoice
