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

            res.status(result.status === 'success' ? 200 : 201).json(result);
        } catch (error) {
            console.error('Error creating or updating play package:', error);
            next(error); // Pass the error to the global error handler
        }
    };
}

export default PlayPackageController;