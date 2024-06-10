import { Router } from 'express'
import timeSlotController from '~/controller/timeslotController'
const timeslotRoute = Router()
timeslotRoute
  .route('/find-free-slot-by-center/:centerId/by-date/:date')
  .get(timeSlotController.getFreeStrartTimeByCenterAndDate)
timeslotRoute
  .route('/find-free-slot-by-center/:centerId/by-date/:date/by-start-time/:start')
  .get(timeSlotController.getMaxTimeAviableFromStartTime)
timeslotRoute
  .route('/find-free-slot-by-center/:centerId/by-date/:date/by-start-time/:start/by-duration/:duration')
  .get(timeSlotController.getCourtByFreeSlot)
export default timeslotRoute
