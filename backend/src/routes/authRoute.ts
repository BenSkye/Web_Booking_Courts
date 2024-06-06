import { Router } from 'express'

import authController from '~/controller/authController'
const authRoute = Router()

authRoute.route('/register').post(authController.registerUser)
authRoute.route('/login').post(authController.loginUser)
authRoute.route('/google').post(authController.googleLogin)
export default authRoute
