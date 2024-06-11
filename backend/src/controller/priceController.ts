import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import priceService from '../services/priceService';
import AppError from '../utils/appError';

class PriceController {
    static getPrices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const query = req.query;
        const prices = await priceService.getPrices(query);
        if (!prices || prices.length === 0) {
            return next(new AppError('No prices found with the given criteria', 404));
        }
        res.status(200).json({
            status: 'success',
            results: prices.length,
            data: {
                prices,
            },
        });
    });

    static getPricesByScheduleType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { scheduleType } = req.params;
        const prices = await priceService.getPricesByScheduleType(scheduleType);
        if (!prices || prices.length === 0) {
            return next(new AppError('No prices found for the given schedule type', 404));
        }
        res.status(200).json({
            status: 'success',
            results: prices.length,
            data: {
                prices,
            },
        });
    });

    // Additional methods for handling other price-related routes can be added here
}

export default PriceController;