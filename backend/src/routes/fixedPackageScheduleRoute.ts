import { Router } from 'express'
const fixedPackageScheduleRoute = Router()
import fixedPackageScheduleController from '../controller/fixedPackageScheduleController'
import authController from '~/controller/authController'

fixedPackageScheduleRoute
  .route('/')
  .post(
    authController.protect,
    authController.restricTO('customer'),
    fixedPackageScheduleController.addFixedPackageSchedule
  )
fixedPackageScheduleRoute.route('/:id').get(fixedPackageScheduleController.getFixedPackageScheduleById)
// fixedPackageScheduleRoute.route('/').get(fixedPackageScheduleController.getFixedPackageSchedule)

export default fixedPackageScheduleRoute
