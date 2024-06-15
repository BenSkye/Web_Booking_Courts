import { Router } from 'express'
import authController from '~/controller/authController'
import bookingController from '~/controller/bookingController'
const bookingRoute = Router()
bookingRoute
  .route('/create-booking-byday')
  .post(authController.protect, authController.restricTO('customer'), bookingController.createBookingbyDay)
bookingRoute.route('/callback-pay-booking-by-day').post(bookingController.callbackPayBookingByDay)
// bookingRoute.route('/check-booking-available').post(authController.protect, bookingController.checkBookingAvailable)
export default bookingRoute
