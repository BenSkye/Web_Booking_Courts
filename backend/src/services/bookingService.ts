import bookingRepository from '~/repository/bookingRepository'
import { ObjectId } from 'mongodb'
import timeSlotRepository from '~/repository/timeslotRepository'
import AppError from '~/utils/appError'

class bookingService {
  static async createBookingbyDay(data: any, userId: string) {
    const slot = {
      courtId: data.courtId,
      date: data.date,
      start: data.start,
      end: data.start
    }
    let allSlotsAvailable = true
    const slotAvilable = []
    const timeSlotRepositoryInstance = new timeSlotRepository()
    while (allSlotsAvailable && new Date(`1970-01-01T${slot.end}:00`) < new Date(`1970-01-01T${data.end}:00`)) {
      const [hour, minute] = slot.start.split(':')
      if (minute === '00') {
        slot.end = `${hour}:30`
      }
      if (minute === '30') {
        slot.end = `${(parseInt(hour) + 1).toString().padStart(2, '0')}:00`
      }
      //check slot trong khoảng booking có available không
      const avilable = await timeSlotRepositoryInstance.checkTimeSlotAvilable(slot)
      if (!avilable) {
        allSlotsAvailable = false
        throw new AppError('Slot not available', 400)
      }
      slotAvilable.push(slot)
      slot.start = slot.end
    }
    if (allSlotsAvailable) {
      const booking = { ...data, userId: userId, status: 'pending' }
      const newBooking = await bookingRepository.createBooking(booking)
      //thanh toán rồi mới update status của slot
      // slotAvilable.forEach(async (slot) => {
      //   timeSlotRepositoryInstance.updateSlotStatus(slot, 'booked')
      // })
      return newBooking
    }
  }
}
export default bookingService
