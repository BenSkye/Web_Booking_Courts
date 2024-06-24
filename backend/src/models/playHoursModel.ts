

import mongoose, { Schema, Document } from 'mongoose';
export interface IPlayPackage extends Document {
    userId: Schema.Types.ObjectId;
    centerId: Schema.Types.ObjectId;
    totalHours: number;
    remainingHours: number;
    playPackageId: Schema.Types.ObjectId;
}

const playHourSchema = new Schema(
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
        playPackageId: [{
            type: Schema.Types.ObjectId,
            ref: 'PlayPackage',
            required: true
        }]
    },
    { timestamps: true }
);

const PlayPackage = mongoose.model('PlayHour', playHourSchema);
export default PlayPackage;
