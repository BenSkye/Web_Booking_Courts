import { NextFunction, Request, Response } from 'express'
import bookingService from '~/services/bookingService'
import centerService from '~/services/centerService'
import InvoiceService from '~/services/invoiceService'
import momoService from '~/services/momoService'
import AppError from '~/utils/appError'
import catchAsync from '~/utils/catchAsync'

class bookingController {
  static createBookingbyDay = catchAsync(async (req: any, res: any, next: any) => {
    const listBooking = req.body.listBooking
    const bookingServiceInstance = new bookingService()
    const paymentResult = await bookingServiceInstance.createBookingbyDay(listBooking, req.user._id)
    res.status(201).json({
      status: 'success',
      data: {
        paymentResult
      }
    })
  })
  static callbackPayBookingByDay = catchAsync(async (req: any, res: any, next: any) => {
    console.log('MoMo Callback:', req.body) // Nhật ký thêm để gỡ lỗi chi tiết
    const bookingServiceInstance = new bookingService()
    if (req.body) {
      const result = bookingServiceInstance.callbackPayBookingByDay(req.body)
    }
    res.status(200).json(req.body)
  })
  static getBookingByDayAndCenter = catchAsync(async (req: any, res: any, next: any) => {
    const centerId = req.query.centerId
    const date = req.query.date
    const bookingServiceInstance = new bookingService()
    const bookingsIncourt = await bookingServiceInstance.getBookingByDayAndCenter(centerId, date)
    res.status(200).json({
      status: 'success',
      data: {
        bookingsIncourt
      }
    })
  })
  static getPersonalBooking = catchAsync(async (req: any, res: any, next: any) => {
    const userId = req.user._id
    const bookingServiceInstance = new bookingService()
    const bookings = await bookingServiceInstance.getPersonalBooking(userId)
    res.status(200).json({
      status: 'success',
      data: {
        bookings
      }
    })
  })
}
export default bookingController
