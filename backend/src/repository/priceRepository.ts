import Price from '~/models/priceModel'

class priceRepository {
  static async addPrice(price: any) {
    const newPrice = new Price(price)
    return newPrice.save()
  }
}
export default priceRepository
