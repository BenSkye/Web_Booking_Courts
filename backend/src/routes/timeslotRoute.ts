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
timeslotRoute
  .route('/find-free-slot-by-center-for-update/:centerId/by-date/:date/:oldStart/:oldEnd/:courtId')
  .get(timeSlotController.getFreeStartTimeByCenterAndDateForUpdate)
timeslotRoute
  .route('/find-free-slot-by-center-for-update/:centerId/by-date/:date/by-start-time/:start/:oldStart/:oldEnd/:courtId')
  .get(timeSlotController.getMaxTimeAviableFromStartTimeForUpdate)
timeslotRoute
  .route(
    '/find-free-slot-by-center-for-update/:centerId/by-date/:date/by-start-time/:start/by-duration/:duration/:oldStart/:oldEnd/:courtId'
  )
  .get(timeSlotController.getCourtByFreeSlotForUpdate)
timeslotRoute.route('/get-price-from-start-to-end/:centerId/:start/:end').get(timeSlotController.getPriceFormStartoEnd)
export default timeslotRoute
