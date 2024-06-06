import { Router } from 'express'
import timeSlotController from '~/controller/timeslotController'
const timeslotRoute = Router()
timeslotRoute
  .route('/find-free-slot-by-center/:centerId/by-date/:date')
  .get(timeSlotController.getFreeSlotByCenterAndDate)
timeslotRoute
  .route('/find-free-slot-by-center/:centerId/by-date/:date/by-start-time/:start')
  .get(timeSlotController.getMaxTimeAviableFromStartTime)
export default timeslotRoute
