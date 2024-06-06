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
      if (timeSlots) {
        const freeSlots = timeSlots.slot.filter((slot) => slot.status !== 'booked')
        for (const slot of freeSlots) {
          startTimes.add(slot.start)
        }
      }
    }
    return Array.from(startTimes)
  }

  static async getMaxTimeAviableFromStartTime(centerId: string, date: string, startTime: string) {
    const isoDate = new Date(`${date}T00:00:00.000Z`)
    const listcourtId = await courtRepository.getListCourtId({ centerId })
    if (listcourtId.length === 0) {
      throw new AppError('No available time slot', 400)
    }
    const endTimes = []
    for (const courtId of listcourtId) {
      const timeSlots = await timeSlotRepository.getTimeslot({ courtId, date: isoDate })
      if (timeSlots) {
        const freeSlots = timeSlots.slot.filter((slot) => slot.status !== 'booked' && slot.start >= startTime)
        if (freeSlots.length > 0) {
          let maxEndTimeForThisCourt = freeSlots[0].end
          for (const slot of freeSlots) {
            if (slot.end > maxEndTimeForThisCourt) {
              maxEndTimeForThisCourt = slot.end
            }
          }
          endTimes.push(maxEndTimeForThisCourt)
        }
      }
    }

    if (endTimes.length === 0) {
      throw new AppError('No available time slot', 400)
    }
    const datePrefix = '1970-01-01T'
    const minEndTimeInMilliseconds = Math.min(...endTimes.map((time) => new Date(datePrefix + time).getTime()))
    const minEndTime = new Date(minEndTimeInMilliseconds).toISOString().substr(11, 5)
    console.log('minEndTime', minEndTime)
    if (minEndTime === null) {
      throw new AppError('No available time slot', 400)
    }
    let maxAvailableTime = new Date(datePrefix + minEndTime).getTime() - new Date(datePrefix + startTime).getTime()
    console.log('maxAvailableTime', maxAvailableTime)
    maxAvailableTime = maxAvailableTime / 60 / 60 / 1000
    return maxAvailableTime
  }
}
export default timeSlotService
