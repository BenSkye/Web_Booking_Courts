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
}
export default timeSlotRepository
