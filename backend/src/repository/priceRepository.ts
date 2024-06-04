import Price from '~/models/priceModel'

class priceRepository {
  static async addPrice(price: any) {
    const newPrice = new Price(price)
    return newPrice.save()
  }
  static async getPrices(query: any) {
    return await Price.find(query)
  }
}
export default priceRepository
