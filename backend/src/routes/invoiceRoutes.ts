import { Router } from 'express'
import authController from '~/controller/authController'
import invoiceController from '~/controller/invoiceController'
const invoiceRoute = Router()

invoiceRoute.route('/get-personal-invoice').get(authController.protect, invoiceController.getInvoiceByUserid)
export default invoiceRoute
