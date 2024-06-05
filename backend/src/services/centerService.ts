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
  static async getPersonalCenters(userId: any) {
    const ListCenter = await centerRepository.getListCenter({ managerId: userId })
    // const ListCenterWithPrices = await Promise.all(
    //   ListCenter.map(async (center: any) => {
    //     const prices = await priceRepository.getPricesByCenterId(center._id)
    //     return { ...center._doc, prices }
    //   })
    // )
    return ListCenter
  }
  static async getPersonalCenterById(centerId: any, userId: any) {
    const center: any = await centerRepository.getCenter({ _id: centerId, managerId: userId })
    console.log(center)
    const prices = await priceRepository.getPrices({ centerId: center._id })
    return { center, prices }
  }
}
export default centerService
