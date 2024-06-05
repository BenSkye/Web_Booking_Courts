import { Router } from 'express'
import authController from '~/controller/authController'
import CenterPackageController from '~/controller/centerPackageController'

const centerPackageRoute = Router()

centerPackageRoute
  .route('/')
  .post(authController.protect, authController.restricTO('admin'), CenterPackageController.createCenterPackage)
export default centerPackageRoute
