import { Router } from 'express'
import PlayPackageController from '~/controller/playPackageController';

const playPackageRoute = Router();

playPackageRoute.route('/').post(PlayPackageController.createOrUpdatePlayPackage);


export default playPackageRoute;