import { Router } from 'express'
import courtController from '~/controller/courtController'
const courtRoute = Router()

courtRoute.route('/get-court-by-centerId/:centerId').get(courtController.getCourtByCenterId)

export default courtRoute