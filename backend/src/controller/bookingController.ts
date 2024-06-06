import { NextFunction, Request, Response } from 'express'
import bookingService from '~/services/bookingService'
import catchAsync from '~/utils/catchAsync'

class bookingController {
  static createBooking = catchAsync(async (req: any, res: any, next: any) => {
    const booking = await bookingService.createBooking(req.body, req.user._id)
    res.status(201).json(booking)
  })
}
export default bookingController
