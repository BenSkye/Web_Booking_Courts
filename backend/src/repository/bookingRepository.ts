import Booking from '~/models/bookingModel'
class bookingRepository {
  static async createBooking(booking: any) {
    return await Booking.create(booking)
  }
}
export default bookingRepository
