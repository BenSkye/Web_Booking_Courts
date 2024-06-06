import courtRepository from '~/repository/courtRepository'
import timeSlotRepository from '~/repository/timeslotRepository'
import AppError from '~/utils/appError'

class timeSlotService {
  static async getFreeStartTimeByCenterAndDate(centerId: string, date: string) {
    const isoDate = new Date(`${date}T00:00:00.000Z`)
    const listcourtId = await courtRepository.getListCourtId({ centerId: centerId })
    console.log('listcourtId', listcourtId)
    const startTimes = new Set()
    for (const courtId of listcourtId) {
      const timeSlots = await timeSlotRepository.getTimeslot({ courtId, date: isoDate })
      console.log('timeSlots', timeSlots)
      if (timeSlots) {
        const freeSlots = timeSlots.slot.filter((slot) => slot.status !== 'booked')
        for (const slot of freeSlots) {
          startTimes.add(slot.start)
        }
      }
    }
    console.log('startTimes', startTimes)
    return Array.from(startTimes)
  }
}
export default timeSlotService
