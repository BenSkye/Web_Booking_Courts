import Booking from '~/models/bookingModel'
class bookingRepository {
  static async createBooking(booking: any) {
    return await Booking.create(booking)
  }
  static async getBookingbyId(id: string) {
    return await Booking.findOne({ _id: id })
  }
  static async getListBooking(query: object) {
    return await Booking.find(query)
  }
  static async getBooking(query: object) {
    return await Booking.findOne(query)
  }
  static async updateBooking(query: object, update: object) {
    return await Booking.findOneAndUpdate(query, update, { new: true })
  }
}
export default bookingRepository
