import { Router } from 'express'
import authController from '~/controller/authController'
import centerController from '~/controller/centerController'

const centerRoute = Router()

centerRoute.route('/').post(authController.protect, authController.restricTO('manager'), centerController.createCenter)

export default centerRoute
