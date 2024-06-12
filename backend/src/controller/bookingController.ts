import { NextFunction, Request, Response } from 'express'
import bookingService from '~/services/bookingService'
import InvoiceService from '~/services/invoiceService'
import catchAsync from '~/utils/catchAsync'

class bookingController {
  static createBookingbyDay = catchAsync(async (req: any, res: any, next: any) => {
    const listBooking = req.body.listBooking
    const totalPrice = req.body.totalPrice
    const newInvoiceInstance = new InvoiceService()
    const newInvoice = await newInvoiceInstance.addInvoiceBookingbyDay(totalPrice, req.user._id)
    const listnewbooking: any[] = await Promise.all(
      listBooking.map(async (booking: any) => {
        booking.invoice = newInvoice._id
        const newbooking = await bookingService.createBookingbyDay(booking, req.user._id)
        console.log('newbooking', newbooking)
        return newbooking
      })
    )
    console.log('listnewbooking', listnewbooking)
    res.status(201).json({
      status: 'success',
      data: {
        listnewbooking: listnewbooking,
        newInvoice: newInvoice
      }
    })
  })
}
export default bookingController
