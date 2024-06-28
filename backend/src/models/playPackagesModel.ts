

import mongoose, { Schema, Document } from 'mongoose';


export interface IPlayPackage extends Document {
  userId: Schema.Types.ObjectId;
  centerId: Schema.Types.ObjectId;
  hour: number;
  price: number;

}

const playPackageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    centerId: {
      type: Schema.Types.ObjectId,
      ref: 'Center',
      required: true
    },
    hour: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    invoiceId: {
      type: Schema.Types.ObjectId,

    }

  },
  { timestamps: true }
);

const PlayPackage = mongoose.model('PlayPackage', playPackageSchema);
export default PlayPackage;
