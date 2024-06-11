import bookingRepository from '~/repository/bookingRepository'
import { ObjectId } from 'mongodb'
import timeSlotRepository from '~/repository/timeslotRepository'
import AppError from '~/utils/appError'

class bookingService {
  static async createBooking(data: any, userId: string) {
    const slot = {
      courtId: data.courtId,
      date: data.date,
      start: data.start,
      end: data.start
    }
    let allSlotsAvailable = true
    while (allSlotsAvailable && new Date(`1970-01-01T${slot.end}:00`) < new Date(`1970-01-01T${data.end}:00`)) {
      const [hour, minute] = slot.start.split(':')
      if (minute === '00') {
        slot.end = `${hour}:30`
      }
      if (minute === '30') {
        slot.end = `${(parseInt(hour) + 1).toString().padStart(2, '0')}:00`
      }
      const timeSlotRepositoryInstance = new timeSlotRepository()
      const avilable = await timeSlotRepositoryInstance.checkTimeSlotAvilable(slot)
      if (!avilable) {
        allSlotsAvailable = false
        throw new AppError('Slot not available', 400)
      }
      slot.start = slot.end
    }
    if (allSlotsAvailable) {
      const booking = { ...data, userId: userId }
      const newBooking = await bookingRepository.createBooking(booking)
      return newBooking
    }
  }
}
export default bookingService
