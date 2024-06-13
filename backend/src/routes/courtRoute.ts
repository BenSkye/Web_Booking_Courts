import { Router } from 'express'
const courtRoute = Router()
import courtController from "../controller/courtController"

courtRoute.route('/admin/manageCourt').get(courtController.getAllCourt);

export default courtRoute;