import { Router } from 'express'
import authController from '~/controller/authController'
import bookingController from '~/controller/bookingController'
const bookingRoute = Router()
bookingRoute.route('/create-booking').post(authController.protect, bookingController.createBooking)
export default bookingRoute
