import { Router } from 'express'
import authController from '~/controller/authController'
import centerController from '~/controller/centerController'

const centerRoute = Router()

centerRoute.route('/')
  .post(authController.protect, authController.restricTO('manager'), centerController.createCenter)
  .get(centerController.getAllCenters)

centerRoute.route('/:id')
  .get(centerController.getCenterById);

centerRoute
  .route('/my-centers')
  .get(authController.protect, authController.restricTO('manager'), centerController.getPersonalCenters)

centerRoute
  .route('/my-centers/:centerId')
  .get(authController.protect, authController.restricTO('manager'), centerController.getPersonalCenterDetail)
centerRoute
  .route('/my-centers/:centerId/select-package/:packageId')
  .patch(authController.protect, authController.restricTO('manager'), centerController.selectPackage)
export default centerRoute
