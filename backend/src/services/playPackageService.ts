import PlayPackageRepository from '../repository/playPackagesRepository';
import PlayHourRepository from '~/repository/playHourRepository';
import PlayPackage from '../models/playPackagesModel';
import PlayHour from '../models/playHoursModel';
import AppError from '~/utils/appError'
import Price from '~/models/priceModel';
import priceRepository from '~/repository/priceRepository';
import InvoiceRepository from '~/repository/invoiceReposotory';
import mongoose from 'mongoose';
import centerRepository from '~/repository/centerRepository'
import momoService from './momoService'
import playPackageRoute from '~/routes/playPackageRoute';

interface IPlayPackageInput {
    userId: string;
    centerId: string;
    hour: number;
    price: number;
    invoiceId: string;
}

class PlayPackageService {

    async momoPayPlayHour(data: any, userID: any) {
        console.log('dataaaaaaaaaaaaaaa', data)
        const { centerId, hour } = data;
        console.log('centerId', centerId.id)
        const priceRepositoryInstance = new priceRepository();
        const invoiceRepositoryInstance = new InvoiceRepository();

        const pricePerHour = await priceRepositoryInstance.getPriceByCenterIdAndScheduleType(centerId, 'PP');
        console.log('pricePerHour', pricePerHour)
        if (!pricePerHour) {
            throw new AppError('Price per hour not found', 404);
        }
        data.price = pricePerHour.price * hour;


        const totalprice = data.price;
        const orderId = 'PP' + Math.floor(Math.random() * 1000000).toString();
        const redirect = `/bookingdetail/${centerId}`;
        const orderInfo = 'Thanh toán gói sân ';
        const callbackUrl = '/api/v1/playPackage/pay-play-package';
        const extraData = JSON.stringify({ data, userID });

        try {
            console.log('Creating payment with MoMo');
            const paymentResult = await momoService.createPayment(
                orderInfo,
                totalprice,
                orderId,
                centerId,
                callbackUrl,
                extraData,
                redirect
            );
            console.log('Payment result:', paymentResult);

            if (paymentResult && paymentResult.payUrl) {
                return { payUrl: paymentResult.payUrl };
            }
        } catch (error) {
            console.error('Error creating payment:', error);
            throw new AppError('Failed to create payment', 500);
        }
    }

    async createOrUpdatePlayPackage(userId: any, playPackage: any) {
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

    async callbackPayForPackage(reqBody: any) {


        console.log('vao dc callback pay for package', reqBody);

        if (reqBody.resultCode !== 0) {
            console.log('Payment failed');
            return { status: 'fail', message: 'Payment failed' };
        }

        const extraData = JSON.parse(reqBody.extraData);

        console.log('Extradataaaaaaaaaaaa', extraData)
        const { centerId, price, hour } = extraData.data;
        console.log('centerId', centerId)
        console.log('price', price)
        console.log('hour', hour)
        const playpackage = { centerId, price, hour };
        const userID = extraData.userID
        console.log('userIDDDDDDDDDDDDDDDDDDDDDd', userID)


        try {
            const playpackageInstance = new PlayPackageService();
            const center = await playpackageInstance.createOrUpdatePlayPackage(userID, playpackage);

            return { status: 'success', center };
        } catch (error) {
            console.error('Error selecting package:', error);
            return { status: 'fail', message: 'Failed to select package' };
        }
    }

    async getPlayHourByUserId(userId: any, centerId: any) {
        try {
            const playHourInstance = new PlayHourRepository();
            const playHour = await playHourInstance.findPlayHourByUserIdAndCenterId(userId, centerId)

            return playHour
        } catch (error: any) {
            return error
        }
    }

}

export default PlayPackageService;