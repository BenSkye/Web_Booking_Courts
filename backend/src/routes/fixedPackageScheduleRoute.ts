import { Router } from 'express'
const fixedPackageScheduleRoute = Router()
import fixedPackageScheduleController from '../controller/fixedPackageScheduleController'

fixedPackageScheduleRoute.route('/').post(fixedPackageScheduleController.addFixedPackageSchedule)
// fixedPackageScheduleRoute.route('/:id').get(fixedPackageScheduleController.getFixedPackageScheduleById)
// fixedPackageScheduleRoute.route('/').get(fixedPackageScheduleController.getFixedPackageSchedule)

export default fixedPackageScheduleRoute
