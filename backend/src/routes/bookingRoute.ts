import { Router } from 'express'
import authController from '~/controller/authController'
import bookingController from '~/controller/bookingController'
const bookingRoute = Router()
bookingRoute.route('/create-booking-byday').post(authController.protect, bookingController.createBookingbyDay)
export default bookingRoute
