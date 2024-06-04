import centerRepository from '~/repository/centerRepository'
import courtRepository from '~/repository/courtRepository'
import priceRepository from '~/repository/priceRepository'

class centerService {
  static async addCenter(data: any) {
    const center = { ...data.center, managerId: data.user }
    const newcenter = await centerRepository.addCenter(center)
    const priceArray = data.price
    const promises = priceArray.map(async (price: any) => {
      price.centerId = newcenter._id
      return priceRepository.addPrice(price)
    })
    const newPrices = await Promise.all(promises)
    const newCourts = []
    for (let i = 0; i < newcenter.courtCount; i++) {
      const court = {
        courtNumber: i + 1,
        centerId: newcenter._id
      }
      const newCourt = await courtRepository.addCourt(court)
      newCourts.push(newCourt)
    }
    return { newcenter, newPrices, newCourts }
  }
}
export default centerService
