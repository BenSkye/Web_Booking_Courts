import { Router } from 'express'
import PlayPackageController from '~/controller/playPackageController';

const playPackageRoute = Router();

playPackageRoute.route('/').get(PlayPackageController.createPlayPackage);


export default playPackageRoute;