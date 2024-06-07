import courtRepository from '~/repository/courtRepository'
import timeSlotRepository from '~/repository/timeslotRepository'
import AppError from '~/utils/appError'
import centerService from './centerService'
import centerRepository from '~/repository/centerRepository'

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
      return null
    }
    const listMinStartTime = []
    const datePrefix = '1970-01-01T'
    for (const courtId of listcourtId) {
      const timeSlots = await timeSlotRepository.getTimeslot({ courtId, date: isoDate })
      if (timeSlots) {
        const bookedSlots = timeSlots.slot.filter((slot) => slot.status == 'booked' && slot.start >= startTime)
        if (bookedSlots.length > 1) {
          const StartTimeBooked = []
          for (const slot of bookedSlots) {
            StartTimeBooked.push(slot.start)
          }
          const minStartTime = Math.min(...StartTimeBooked.map((time) => new Date(datePrefix + time + 'Z').getTime()))
          listMinStartTime.push(minStartTime)
        }
        if (bookedSlots.length == 0) {
          const maxEndTime = Math.max(...timeSlots.slot.map((slot) => new Date(datePrefix + slot.end + 'Z').getTime()))
          listMinStartTime.push(maxEndTime)
        }
      }
    }

    if (listMinStartTime.length === 0) {
      return null
    }
    const maxEndTimeInMilliseconds = Math.max(...listMinStartTime)
    const maxEndTimeAviable = new Date(maxEndTimeInMilliseconds).toISOString().substr(11, 5)
    if (maxEndTimeAviable === null) {
      return null
    }
    let maxAvailableTime =
      new Date(datePrefix + maxEndTimeAviable + 'Z').getTime() - new Date(datePrefix + startTime + 'Z').getTime()
    if (maxAvailableTime < 0) {
      return null
    }
    maxAvailableTime = maxAvailableTime / 60 / 60 / 1000
    return maxAvailableTime
  }

  static async getCourtByFreeSlot(centerid: string, date: string, start: string, duration: number) {
    console.log('start', start)
    const isoDate = new Date(`${date}T00:00:00.000Z`)
    const listcourtId = await courtRepository.getListCourtId({ centerId: centerid })
    const CenterTime = await centerRepository.getCenterStartandEndTime({ _id: centerid })
    if (CenterTime) {
      const [centerClosehours, centerCloseminutes] = CenterTime.closeTime.split(':').map(Number)
      const centerClose = centerClosehours * 60 + centerCloseminutes
      const [startHours, startMinutes] = start.split(':').map(Number)
      const startSlot = startHours * 60 + startMinutes
      const durationAvailable = (centerClose - startSlot) / 60
      if (duration > durationAvailable) {
        return null
      }
    }

    const datePrefix = '1970-01-01T'
    const startTimeDate = new Date(`${datePrefix}${start}:00Z`)
    duration = duration * 60 * 60 * 1000
    const endTime = new Date(startTimeDate.getTime() + duration)
    const endHours = endTime.getUTCHours().toString().padStart(2, '0')
    const endMinutes = endTime.getUTCMinutes().toString().padStart(2, '0')
    const formattedEndTime = `${endHours}:${endMinutes}`
    const availableCourt = []
    for (const courtId of listcourtId) {
      const timeSlots = await timeSlotRepository.getTimeslot({ courtId, date: isoDate })
      let isAvailable = true
      if (timeSlots) {
        const bookedSlots = timeSlots.slot.filter((slot) => slot.status == 'booked')

        for (const slot of bookedSlots) {
          if (slot.start >= start && slot.end <= formattedEndTime) {
            isAvailable = false
            break
          }
        }
      }
      if (isAvailable) {
        const court = await courtRepository.getCourt({ _id: courtId })
        availableCourt.push(court)
      }
    }
    return availableCourt
  }
}
export default timeSlotService
