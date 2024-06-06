import { Router } from 'express'
import timeSlotController from '~/controller/timeslotController'
const timeslotRoute = Router()
timeslotRoute
  .route('/find-free-slot-by-center/:centerId/by-date/:date')
  .get(timeSlotController.getFreeSlotByCenterAndDate)
export default timeslotRoute
