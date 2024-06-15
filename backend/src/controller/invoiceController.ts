import InvoiceService from '~/services/invoiceService'
import catchAsync from '~/utils/catchAsync'

class invoiceController {
  static getInvoiceByUserid = catchAsync(async (req: any, res: any, next: any) => {
    const invoiceServiceInstance = new InvoiceService()
    const invoices = await invoiceServiceInstance.getInvoicesByUserId(req.user._id)
    res.status(200).json({
      status: 'success',
      data: {
        invoices
      }
    })
  })
}

export default invoiceController
