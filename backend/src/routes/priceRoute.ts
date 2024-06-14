import { Router } from 'express'
import priceController from "~/controller/priceController";

const priceRoute = Router();

priceRoute.route('/schedule-type/:scheduleType').get(priceController.getPricesByScheduleType);
priceRoute
  .route('/center/:centerId/schedule-type/:scheduleType')
  .get(priceController.getPriceByCenterIdAndSchedulerType)
priceRoute.route('/').get(priceController.getPrices);

export default priceRoute;