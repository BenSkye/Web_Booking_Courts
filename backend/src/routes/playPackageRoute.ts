import { Router } from 'express'
import authController from '~/controller/authController';
import PlayPackageController from '~/controller/playPackageController';

const playPackageRoute = Router();

playPackageRoute.route('/').post(authController.protect, authController.restricTO('customer'), PlayPackageController.createOrUpdatePlayPackage);

playPackageRoute.route('/userPlayHour').get(PlayPackageController.getPlayPackageByUserId);

export default playPackageRoute;