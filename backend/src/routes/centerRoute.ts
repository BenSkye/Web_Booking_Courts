import { Router } from 'express'
import authController from '~/controller/authController'
import centerController from '~/controller/centerController'

const centerRoute = Router()

centerRoute
  .route('/')
  .post(authController.protect, authController.restricTO('manager'), centerController.createCenter)
  .get(centerController.getAllCenters)

centerRoute
  .route('/my-centers')
  .get(authController.protect, authController.restricTO('manager'), centerController.getPersonalCenters)

centerRoute
  .route('/my-centers/update/:centerId')
  .put(authController.protect, authController.restricTO('manager'), centerController.updateCenterInforById)  

centerRoute
  .route('/my-active-centers')
  .get(authController.protect, authController.restricTO('manager'), centerController.getPersonalActiveCenters)

  

centerRoute
  .route('/:id')
  .get(centerController.getCenterById)

centerRoute
  .route('/my-centers/:centerId')
  .get(authController.protect, authController.restricTO('manager'), centerController.getPersonalCenterDetail)

  //gọi tới api tạo momo
centerRoute
  .route('/my-centers/:centerId/select-package/:packageId')
  .patch(authController.protect, authController.restricTO('manager'), centerController.momoPayPackageController)
 
  centerRoute.route('/callback-package-pay').post(centerController.handlePackagePaymentCallback)

centerRoute
  .route('/centers/:centerId/change-status-accepted')
  .get(authController.protect, authController.restricTO('admin'), centerController.changeCenterStatusAccept)
  
  centerRoute
  .route('/centers/:centerId/change-status')
  .patch(authController.protect, authController.restricTO('admin'), centerController.changeCenterStatus)

centerRoute.route('/admin/Dashboard').get(authController.protect, centerController.getAllSubscriptions)
export default centerRoute
