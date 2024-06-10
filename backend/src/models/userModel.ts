import mongoose from 'mongoose'
import Validator from 'validator'
const { Schema } = mongoose
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: [true, 'Email không được để trống'],
      unique: true,
      validate: [Validator.isEmail, 'Email không hợp lệ']
    },
    userPhone: {
      type: Number
      // required: true
    },
    userAddress: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['customer', 'manager', 'admin'],
      default: 'customer'
    },
    password: {
      type: String,
      required: true
    },
    passwordChangeAt: Date
  },
  { timestamps: true } // Change 'timeStamp' to 'timestamps'
)

const User = mongoose.model('User', userSchema)
export default User
