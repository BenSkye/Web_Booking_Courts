

import mongoose, { Schema, Document } from 'mongoose';


export interface IPlayPackage extends Document {
  userId: Schema.Types.ObjectId;
  centerId: Schema.Types.ObjectId;
  totalHours: number;
  remainingHours: number;

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
    totalHours: {
      type: Number,
      required: true
    },
    remainingHours: {
      type: Number,
      required: true
    },

  },
  { timestamps: true }
);

const PlayPackage = mongoose.model('PlayPackage', playPackageSchema);
export default PlayPackage;
