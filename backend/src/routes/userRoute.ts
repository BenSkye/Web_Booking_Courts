import { Router } from 'express'
import userController from '~/controller/userController'
import authController from '~/controller/authController'

const userRoute = Router()

userRoute.route('/update').put(authController.protect, userController.updateUser)
userRoute.route('/personal-information').get(authController.protect, userController.getPersonal)
userRoute.route('/admin/manage_people').get(userController.getAllUser)
export default userRoute
