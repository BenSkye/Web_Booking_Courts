import Invoice from '~/models/invoiceModel'

interface IinvoiceRepository {
  addInvoice(invoice: any): Promise<any>
  updateInvoice(query: any, update: any): Promise<any | null>
  getInvoices(query: any): Promise<any[]>
  getInvoice(query: any): Promise<any | null>
}
class InvoiceRepository implements IinvoiceRepository {
  async addInvoice(invoice: any) {
    const newInvoice = new Invoice(invoice)
    return newInvoice.save()
  }
  async updateInvoice(query: any, update: any) {
    return Invoice.findOneAndUpdate(query, update, { new: true })
  }
  getInvoices(query: any): Promise<any[]> {
    throw new Error('Method not implemented.')
  }
  getInvoice(query: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}
export default InvoiceRepository
