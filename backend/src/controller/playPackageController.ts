import centerService from '~/services/centerService'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import PlayPackageService from '~/services/playPackageService';
import PlayPackageRepository from '../repository/playPackagesRepository';
import authController from './authController';
import userRepository from '../repository/userRepository';

import { Request, Response, NextFunction } from 'express';



class PlayPackageController {
    static createOrUpdatePlayPackage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const playPackage = req.body; // Nhận playPackage từ request body

            const playPackageService = new PlayPackageService();
            const result = await playPackageService.createOrUpdatePlayPackage(playPackage);

            res.status(result.status === 'success' ? 200 : 201).json(result);
        } catch (error) {
            console.error('Error creating or updating play package:', error);
            next(error); // Pass the error to the global error handler
        }
    };
}

export default PlayPackageController;