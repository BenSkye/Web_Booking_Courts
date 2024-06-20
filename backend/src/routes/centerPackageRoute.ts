import { Router } from 'express'
import authController from '~/controller/authController'
import CenterPackageController from '~/controller/centerPackageController'

const centerPackageRoute = Router()

centerPackageRoute
  .route('/')
  .post(authController.protect, authController.restricTO('admin'), CenterPackageController.createCenterPackage)
centerPackageRoute
  .route('/getAllCenterPackage')
  .get(authController.protect, authController.restricTO('admin', 'manager'), CenterPackageController.getAllCenterPackage)
export default centerPackageRoute
