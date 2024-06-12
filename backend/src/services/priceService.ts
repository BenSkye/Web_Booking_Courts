import priceRepository from '../repository/priceRepository' // Adjust the import path as necessary

interface IPriceService {
  getPrices(query: any): Promise<any>
  getPricesByScheduleType(scheduleType: string): Promise<any>
}
class PriceService implements IPriceService {
  async getPrices(query: any) {
    try {
      const priceRepositoryInstance = new priceRepository()
      const prices = await priceRepositoryInstance.getPrices(query)
      return prices
    } catch (error) {
      console.error('Error fetching prices:', error)
      throw error // Rethrow the error to be handled by the caller
    }
  }
  async getPricesByScheduleType(cheduleType: string) {
    try {
      const prices = await priceRepository.getPricesByScheduleType(cheduleType)
      return prices
    } catch (error) {
      console.error('Error fetching prices by schedule type:', error)
      throw error // Rethrow the error to be handled by the caller
    }
  }
}

export default PriceService
