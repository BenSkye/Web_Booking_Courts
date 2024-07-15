import { Router } from 'express'
import authController from '~/controller/authController';
import PlayPackageController from '~/controller/playPackageController';

const playPackageRoute = Router();

playPackageRoute.route('/').post(authController.protect, authController.restricTO('customer'), PlayPackageController.momoPayPackageController);

playPackageRoute.route('/userPlayHour/:centerId').get(authController.protect, authController.restricTO('customer'), PlayPackageController.getPlayPackageByUserId);


playPackageRoute.route('/pay-play-package').post(PlayPackageController.handlePackagePaymentCallback);

export default playPackageRoute;