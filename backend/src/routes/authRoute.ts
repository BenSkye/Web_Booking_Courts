import { Router } from 'express'

import authController from '~/controller/authController'
const authRoute = Router()

authRoute.route('/register').post(authController.registerUser)
authRoute.route('/login').post(authController.loginUser)

export default authRoute
