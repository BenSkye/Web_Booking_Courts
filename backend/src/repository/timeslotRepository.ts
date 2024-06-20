import TimeSlot from '~/models/timeslotModel'
interface ITimeSlot {
  courtId: string
  date: Date
  slot: {
    start: string
    end: string
    status?: string
  }[]
}

interface ITimeSlotRepository {
  addTimeSlot(timeslot: ITimeSlot): Promise<any>
  addManyTimeSlots(timeslots: ITimeSlot[]): Promise<any[]>
  getListTimeslot(query: object): Promise<any[]>
  getTimeslot(query: object): Promise<any | null>
  updateSlotStatus(param: object, status: string): Promise<any | null>
  checkTimeSlotAvailable(param: object): Promise<boolean>
  checkTimeSlotAvailableForUpdate(param: object): Promise<boolean>
}
class timeSlotRepository implements ITimeSlotRepository {
  async addTimeSlot(timeslot: ITimeSlot) {
    const newtimeslot = new TimeSlot(timeslot)
    return newtimeslot.save()
  }
  async addManyTimeSlots(timeslots: ITimeSlot[]) {
    return TimeSlot.insertMany(timeslots)
  }
  async getListTimeslot(query: object) {
    return await TimeSlot.find(query)
  }
  async getTimeslot(query: object) {
    return await TimeSlot.findOne(query)
  }
  async updateSlotStatus(
    param: {
      courtId: string
      date: Date
      start: string
      end: string
    },
    status: string
  ) {
    const query = { courtId: param.courtId, date: param.date, 'slot.start': param.start, 'slot.end': param.end }
    const data = { $set: { 'slot.$.status': status } }
    const result = await TimeSlot.findOneAndUpdate(query, data, { new: true })
    return result
  }
  async checkTimeSlotAvailable(param: { courtId: string; date: Date; start: string; end: string }) {
    const query = {
      courtId: param.courtId,
      date: param.date
    }
    const result = await TimeSlot.findOne(query)
    if (result !== null) {
      const isBooked = result.slot.some(
        (slot: any) =>
          (slot.status === 'booked' || slot.status === 'booking') && slot.start < param.end && slot.end > param.start
      )
      return !isBooked
    }
    return false
  }
  async checkTimeSlotAvailableForUpdate(param: {
    courtId: string
    date: Date
    start: string
    end: string
    oldStart: string
    oldEnd: string
  }) {
    const query = {
      courtId: param.courtId,
      date: param.date
    }
    console.log('param', param)
    const result = await TimeSlot.findOne(query)
    if (result !== null) {
      const isBooked = result.slot.some(
        (slot: any) =>
          (slot.status === 'booked' || slot.status === 'booking') &&
          slot.start < param.end &&
          slot.end > param.start &&
          (slot.start > param.oldEnd || slot.end < param.oldStart)
      )
      console.log('isBooked', isBooked)
      return !isBooked
    }
    return false
  }
}
export default timeSlotRepository
