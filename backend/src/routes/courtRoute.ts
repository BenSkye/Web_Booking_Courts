import { Router } from 'express'
const courtRoute = Router()
import courtController from '../controller/courtController'

courtRoute.route('/admin/manageCourt').get(courtController.getAllCourt);

courtRoute.route('/get-court-by-centerId/:centerId').get(courtController.getCourtByCenterId)

export default courtRoute;


