import TimeSlot from '~/models/timeslotModel'

class timeSlotRepository {
  static async addTimeSlot(timeslot: any) {
    const newtimeslot = new TimeSlot(timeslot)
    return newtimeslot.save()
  }
  static async addManyTimeSlots(timeslots: any) {
    return TimeSlot.insertMany(timeslots)
  }
  static async getListTimeslot(query: any) {
    return await TimeSlot.find(query)
  }
  static async getTimeslot(query: any) {
    return await TimeSlot.findOne(query)
  }
  static async updateSlotStatus(param: any, status: string) {
    const query = { courtId: param.courtId, date: param.date, 'slot.start': param.start, 'slot.end': param.end }
    const data = { $set: { 'slot.$.status': status } }
    const result = await TimeSlot.findOneAndUpdate(query, data, { new: true })
    return result
  }
  static async checkTimeSlotAvilable(param: any) {
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
