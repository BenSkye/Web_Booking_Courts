import centerPackageRepository from '~/repository/centerPackageRepository'
import centerRepository from '~/repository/centerRepository'
import courtRepository from '~/repository/courtRepository'
import priceRepository from '~/repository/priceRepository'
import timeSlotRepository from '~/repository/timeslotRepository'
import AppError from '~/utils/appError'

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
    const priceIds = newPrices.map((price) => price._id)

    newcenter.price = priceIds
    await centerRepository.updateCenter(newcenter._id, newcenter)
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

  static async getAllCenters() {
    try {
      const centers = await centerRepository.getAllCenters();
      return centers
    } catch (error) {
      throw new Error(`Could not fetch all centers: ${(error as Error).message}`)
    }
  }

  static async getPersonalCenters(userId: string) {
    const ListCenter = await centerRepository.getListCenter({ managerId: userId })
    // const ListCenterWithPrices = await Promise.all(
    //   ListCenter.map(async (center: any) => {
    //     const prices = await priceRepository.getPricesByCenterId(center._id)
    //     return { ...center._doc, prices }
    //   })
    // )
    return ListCenter
  }

  static async getPersonalCenterById(centerId: string, userId: string) {
    const center: any = await centerRepository.getCenter({ _id: centerId, managerId: userId })
    console.log(center)
    const prices = await priceRepository.getPrices({ centerId: center._id })
    return { center, prices }
  }

  static async selectPackage(centerId: string, packageid: string, userId: string) {
    const center = await centerRepository.getCenter({ _id: centerId, managerId: userId })
    if (!center) {
      throw new AppError('Can not found center', 404)
    }
    if (center.status.includes('pending')) {
      throw new AppError('Can not set Package now', 409)
    }
    const centerPackage = await centerPackageRepository.getCenterPackage({ _id: packageid })
    if (!centerPackage) {
      throw new AppError('Can not found centerPackage', 404)
    }
    let latestSubscription
    if (center.subscriptions.length > 0) {
      latestSubscription = center.subscriptions.reduce((latest, subscription) => {
        return latest.expiryDate > subscription.expiryDate ? latest : subscription
      })
    }
    console.log('latestSubscription', latestSubscription)
    let activationDate = new Date()
    activationDate.setUTCHours(0, 0, 0, 0)
    if (latestSubscription && latestSubscription.expiryDate > activationDate) {
      const newDate = new Date(latestSubscription.expiryDate.getTime()) //lấy ngày kết thúc gần nhất
      newDate.setDate(newDate.getDate() + 1) //cộng thêm 1 ngày
      activationDate = newDate
      console.log('activationDate', activationDate)
    }
    const expiryDate = new Date(activationDate)
    expiryDate.setMonth(activationDate.getMonth() + centerPackage.durationMonths)
    const subscription = {
      packageId: packageid,
      activationDate: activationDate,
      expiryDate: expiryDate
    }
    center.subscriptions.push(subscription)
    if (center.status.includes('accepted') || center.status.includes('expired')) {
      center.status = 'active'
    }

    const modifeCenter = await centerRepository.updateCenter({ _id: centerId }, center)
    const listCourt = await courtRepository.getListCourt({ centerId })
    const slotsAray: { start: string; end: string }[] = []
    const slot = {
      start: center.openTime,
      end: center.openTime
    }
    while (new Date(`1970-01-01T${slot.end}:00`) < new Date(`1970-01-01T${center.closeTime}:00`)) {
      const [hour, minute] = slot.start.split(':')
      if (minute === '00') {
        slot.end = `${hour}:30`
      }
      if (minute === '30') {
        slot.end = `${(parseInt(hour) + 1).toString().padStart(2, '0')}:00`
      }
      slotsAray.push({ ...slot })
      slot.start = slot.end
    }
    const ListTimeslot: { courtId: string; date: Date; slot: { start: string; end: string }[] }[] = []
    listCourt.forEach(async (court: any) => {
      const startDay = new Date(activationDate.getTime())
      while (startDay <= expiryDate) {
        const newTimeSlot = {
          courtId: court._id,
          date: new Date(startDay.getTime()),
          slot: slotsAray
        }
        ListTimeslot.push(newTimeSlot)
        startDay.setDate(startDay.getDate() + 1)
      }
    })
    await timeSlotRepository.addManyTimeSlots(ListTimeslot)
    return modifeCenter
  }

  static async changeCenterStatus(
    centerId: string,
    status: 'pending' | 'accepted' | 'active' | 'expired' | 'rejected'
  ) {
    const center = await centerRepository.getCenter({ _id: centerId })
    if (!center) {
      throw new AppError('Can not found center', 404)
    }
    center.status = status
    return centerRepository.updateCenter({ _id: centerId }, center)
  }
}
export default centerService
