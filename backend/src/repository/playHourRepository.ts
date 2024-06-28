import PlayHour from '../models/playHoursModel';
import { Schema } from 'mongoose';



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
        return await PlayHour.findOne({ userId, centerId });
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