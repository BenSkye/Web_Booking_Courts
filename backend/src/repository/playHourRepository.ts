import PlayHour from '../models/playHoursModel';
import { Schema } from 'mongoose';
import User from '../models/playHoursModel'


interface IPlayHourRepository {
    addPlayHour(playHour: any): Promise<any>;
    updatePlayHour(PlayHour: any): Promise<any>;
    findPlayHourByUserIdAndCenterId(userId: any, centerId: any): Promise<any>;

}

class PlayHourRepository implements IPlayHourRepository {
    async addPlayHour(playHourData: any) {
        const newPlayHour = await PlayHour.create(playHourData);
        return newPlayHour;
    }

    public async findPlayHourByUserIdAndCenterId(userId: any, centerId: any) {
        console.log('center,user', centerId, userId)
        const playHour = await PlayHour.findOne({ userId, centerId }).populate('userId').populate('centerId');
        console.log('playHour', playHour)
        return playHour
    }

    public async updatePlayHour(playHour: any) {
        try {
            return await PlayHour.findByIdAndUpdate(playHour._id, playHour, { new: true });
        } catch (error) {
            console.error('Error updating play hour:', error);
            throw error;
        }
    }

}

export default PlayHourRepository;