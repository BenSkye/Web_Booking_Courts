import centerService from '~/services/centerService'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import PlayPackageService from '~/services/playPackageService';
import PlayPackageRepository from '../repository/playPackagesRepository';
import authController from './authController';
import userRepository from '../repository/userRepository';


import { Request, Response, NextFunction } from 'express';



class PlayPackageController {
    static createOrUpdatePlayPackage = async (req: any, res: any, next: any) => {
        try {
            const playPackage = req.body; // Nhận playPackage từ request body
            console.log("req.user", req.user)

            const userId = req.user._id.toString()
            console.log("useId123", userId)
            const playPackageService = new PlayPackageService();
            const result = await playPackageService.createOrUpdatePlayPackage(userId, playPackage);

            res.status(200).json(result);
        } catch (error) {
            console.error('Error creating or updating play package:', error);
            next(error); // Pass the error to the global error handler
        }
    };

    static getPlayPackageByUserId = async (req: any, res: any, next: any) => {
        try {
            const { centerId } = req.params
            const userId = req.user._id
            const playPackageService = new PlayPackageService();
            const getPlayPackageByUserId = await playPackageService.getPlayHourByUserId(userId, centerId);


            return res.status(200).json(getPlayPackageByUserId);
        } catch {
            res.status(500).json({})
        }
    }
    static momoPayPackageController = catchAsync(async (req: any, res: any, next: any) => {
        console.log('req.body', req.body)
        const playpackageServiceInstance = new PlayPackageService()
        const result = await playpackageServiceInstance.momoPayPlayHour(req.body, req.user.id)

        return res.status(201).json({ result })
    })

    static handlePackagePaymentCallback = catchAsync(async (req: any, res: any, next: any) => {
        const playpackageInstance = new PlayPackageService()
        console.log('qqqqqqqqqqqqqq', req.body)
        const result = await playpackageInstance.callbackPayForPackage(req.body)
        console.log('resultttttttttttt', result)
        if (result.status === 'success') {
            res.status(200).json({
                status: 'success',
                data: result.center
            })
        } else {
            res.status(400).json({
                status: 'fail',
                message: result.message || 'Payment failed'
            })
        }
    })
}

export default PlayPackageController;