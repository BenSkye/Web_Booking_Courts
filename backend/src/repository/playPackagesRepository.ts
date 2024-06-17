
import PlayPackage from '~/models/playPackagesModel';
import { Schema } from 'mongoose';
interface IPlayPackage {
    userId: Schema.Types.ObjectId;
    centerId: Schema.Types.ObjectId;
    totalHours: number;
    remainingHours: number;
    purchaseAt: Date;
}


interface IPlayPackageRepository {
    addPlayPackage(playPackage: IPlayPackage): Promise<any>;

}

class PlayPackageRepository implements IPlayPackageRepository {
    async addPlayPackage(playPackage: IPlayPackage) {
        const newPlayPackage = new PlayPackage(playPackage);
        return await newPlayPackage.save();
    }


}

export default PlayPackageRepository;
