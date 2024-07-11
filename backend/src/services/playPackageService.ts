import PlayPackageRepository from '../repository/playPackagesRepository';
import PlayHourRepository from '~/repository/playHourRepository';
import PlayPackage from '../models/playPackagesModel';
import PlayHour from '../models/playHoursModel';
import AppError from '~/utils/appError'
import Price from '~/models/priceModel';
import priceRepository from '~/repository/priceRepository';
import InvoiceRepository from '~/repository/invoiceReposotory';

interface IPlayPackageInput {
    userId: string;
    centerId: string;
    hour: number;
    price: number;
    totalHours: number;
    remainingHours: number;
    playPackageId: string;
    invoiceId: string;
}

class PlayPackageService {

    async createOrUpdatePlayPackage(userId: any, playPackage: IPlayPackageInput) {
        try {
            const { centerId, hour } = playPackage;
            const priceRepositoryInstance = new priceRepository();
            const invoiceRepositoryInstance = new InvoiceRepository();

            const pricePerHour = await priceRepositoryInstance.getPriceByCenterIdAndScheduleType(centerId, 'PP');
            console.log('pricePerHour', pricePerHour)
            if (!pricePerHour) {
                throw new AppError('Price per hour not found', 404);
            }
            playPackage.price = pricePerHour.price * hour;
            const invoiceID = 'BPP' + new Date().getTime()
            const newInvoice = { invoiceID, userId, price: playPackage.price, status: 'pending', invoiceFor: 'BPP' }

            const invoice = await invoiceRepositoryInstance.addInvoice(newInvoice);
            console.log('invoice', invoice)
            if (invoice) {
                playPackage.invoiceId = invoice._id.toString();
                playPackage.userId = userId
            }
            console.log('playPackageInvoice', playPackage.invoiceId);
            const playPackageRepositoryInstance = new PlayPackageRepository();

            const createdPlayPackage = await playPackageRepositoryInstance.addPlayPackage(playPackage);

            // Tìm kiếm một PlayHours hiện có với userId và centerId
            const playHourRepositoryInstance = new PlayHourRepository();
            const existingPlayHour = await playHourRepositoryInstance.findPlayHourByUserIdAndCenterId(userId, centerId);
            console.log('existingPlayHour', existingPlayHour)
            // Nếu không, tạo một PlayHours mới với totalHours và remainingHours bỏ id Của createdPlayPackage vào từ PlayPackage
            if (!existingPlayHour) {
                const newPlayHour = new PlayHour({
                    userId: userId,
                    centerId: centerId,
                    totalHours: createdPlayPackage.hour,
                    remainingHours: createdPlayPackage.hour,
                    playPackageId: [createdPlayPackage._id],


                })
                const createdPlayHour = await playHourRepositoryInstance.addPlayHour(newPlayHour);
            }
            // Nếu tồn tại, cập nhật totalHours và remainingHours
            else {
                existingPlayHour.totalHours += createdPlayPackage.hour;
                existingPlayHour.remainingHours += createdPlayPackage.hour;
                existingPlayHour.playPackageId.push(createdPlayPackage._id);
                await playHourRepositoryInstance.updatePlayHour(existingPlayHour);
            }
            return {
                status: 'success',
                data: createdPlayPackage

            }

        } catch (error) {
            console.error('Error creating or updating play package:', error);
            throw error; // Throw the error to be handled by the caller
        }
    }
    async getPlayHourByUserId(userId: string) {
        try {
            const playPackages = await PlayHour.find({ userId }).populate('userId').exec();
            return playPackages
        } catch (error: any) {
            return error
        }
    }
}

export default PlayPackageService;