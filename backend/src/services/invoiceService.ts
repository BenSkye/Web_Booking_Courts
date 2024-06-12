import InvoiceRepository from '~/repository/invoiceReposotory'

interface IinvoiceService {
  addInvoiceBookingbyDay(price: any, userid: string): Promise<any>
  paidIvoice(invoiceId: string): Promise<any>
  getInvoices(query: any): Promise<any>
  getInvoice(query: any): Promise<any | null>
}
class InvoiceService implements IinvoiceService {
  async addInvoiceBookingbyDay(price: any, userid: string) {
    const InvoiceRepositoryInstance = new InvoiceRepository()
    const newInvoice = {
      price: price,
      userId: userid,
      status: 'pending',
      invoiceFor: 'bookingByDay'
    }
    return InvoiceRepositoryInstance.addInvoice(newInvoice)
  }
  async paidIvoice(invoiceId: string) {
    const InvoiceRepositoryInstance = new InvoiceRepository()
    return InvoiceRepositoryInstance.updateInvoice({ _id: invoiceId }, { status: 'paid' })
  }
  getInvoices(query: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  getInvoice(query: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
export default InvoiceService
