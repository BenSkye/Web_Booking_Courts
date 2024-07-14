import { Router } from 'express'
import authController from '~/controller/authController'
import bookingController from '~/controller/bookingController'
const bookingRoute = Router()
bookingRoute
  .route('/create-booking-byday')
  .post(authController.protect, authController.restricTO('customer'), bookingController.createBookingbyDay)
bookingRoute.route('/callback-pay-booking-by-day').post(bookingController.callbackPayBookingByDay)
bookingRoute.route('/callback-pay-update-booking-by-day').post(bookingController.callbackPayUpdateBookingByDay)
bookingRoute
  .route('/get-booking-by-day-and-center')
  .get(authController.protect, authController.restricTO('manager'), bookingController.getBookingByDayAndCenter)
bookingRoute
  .route('/get-personal-booking')
  .get(authController.protect, authController.restricTO('customer'), bookingController.getPersonalBooking)
bookingRoute
  .route('/get-booking-by-invoiceId/:invoiceId')
  .get(authController.protect, authController.restricTO('customer'), bookingController.getBookingByInvoiceId)
bookingRoute
  .route('/update-booking-byDay-increase-price')
  .put(authController.protect, authController.restricTO('customer'), bookingController.UpdateBookingbyDayIncreasePrice)
bookingRoute
  .route('/update-booking-byDay-decrease-price')
  .put(authController.protect, authController.restricTO('customer'), bookingController.UpdateBookingbyDayDecreasePrice)
bookingRoute
  .route('/completed-booking/:bookingId')
  .get(authController.protect, authController.restricTO('manager'), bookingController.completedBooking)
bookingRoute
  .route('/cancelled-booking/:bookingId')
  .get(authController.protect, authController.restricTO('customer'), bookingController.cancelledBooking)
bookingRoute
  .route('/get-booking-by-day/:centerId')
  .get(authController.protect, authController.restricTO('manager'), bookingController.getBookingByDay)
bookingRoute
  .route('/booking-directly')
  .post(authController.protect, authController.restricTO('manager'), bookingController.bookingDirectly)
// bookingRoute.route('/check-booking-available').post(authController.protect, bookingController.checkBookingAvailable)
export default bookingRoute
