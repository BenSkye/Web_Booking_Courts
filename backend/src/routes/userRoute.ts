import { Router } from 'express'
import userController from '~/controller/userController';
import authController from '~/controller/authController';

const userRoute = Router();

userRoute.route('/update').put(authController.protect,userController.updateUser)
export default userRoute;