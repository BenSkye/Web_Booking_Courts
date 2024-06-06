import mongoose from 'mongoose'
const { Schema } = mongoose

const centerPackageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  durationMonths: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})
const CenterPackage = mongoose.model('CenterPackage', centerPackageSchema)
export default CenterPackage
