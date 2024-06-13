import { Schema } from 'mongoose'
import Price from '~/models/priceModel'
interface IPrice {
  centerId: Schema.Types.ObjectId
  price: number
  startTime: string
  endTime: string
  scheduleType: string
}

interface IPriceRepository {
  addPrice(price: IPrice): Promise<any>
  getPrices(query: object): Promise<any[]>
  getPrice(query: object): Promise<any | null>
}
class priceRepository implements IPriceRepository {
  async addPrice(price: IPrice) {
    const newPrice = new Price(price)
    return newPrice.save()
  }
  async getPrices(query: object) {
    return await Price.find(query)
  }
  async getPrice(query: object) {
    return await Price.findOne(query)
  }
  static async getPricesByScheduleType(cheduleType: any) {
    return await Price.find({ cheduleType })
  }
}
export default priceRepository
