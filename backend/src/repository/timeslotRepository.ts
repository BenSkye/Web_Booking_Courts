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
  checkTimeSlotAvilable(param: object): Promise<boolean>
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
  async checkTimeSlotAvilable(param: { courtId: string; date: Date; start: string; end: string }) {
    const query = {
      courtId: param.courtId,
      date: param.date
    }
    const result = await TimeSlot.findOne(query)
    if (result !== null) {
      const isBooked = result.slot.some(
        (slot: any) => slot.status === 'booked' && slot.start === param.start && slot.end === param.end
      )
      return !isBooked
    }
    return false
  }
}
export default timeSlotRepository
