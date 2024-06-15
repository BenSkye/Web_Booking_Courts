import { promises } from 'dns'
import Invoice from '~/models/invoiceModel'

interface IinvoiceRepository {
  addInvoice(invoice: any): Promise<any>
  updateInvoice(query: any, update: any): Promise<any | null>
  getListInvoices(query: any): Promise<any[]>
  getInvoice(query: object): Promise<any | null>
  deleteInvoice(query: object): Promise<any>
}
class InvoiceRepository implements IinvoiceRepository {
  async addInvoice(invoice: any) {
    const newInvoice = new Invoice(invoice)
    return newInvoice.save()
  }
  async updateInvoice(query: any, update: any) {
    return Invoice.findOneAndUpdate(query, update, { new: true })
  }
  async getListInvoices(query: any): Promise<any[]> {
    return Invoice.find(query)
  }
  async getInvoice(query: object): Promise<any> {
    return Invoice.findOne(query)
  }
  async deleteInvoice(query: object): Promise<any> {
    return Invoice.deleteOne(query)
  }
}
export default InvoiceRepository
