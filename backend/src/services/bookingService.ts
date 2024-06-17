import bookingRepository from '~/repository/bookingRepository'
import { ObjectId } from 'mongodb'
import timeSlotRepository from '~/repository/timeslotRepository'
import AppError from '~/utils/appError'
import InvoiceService from './invoiceService'
import centerService from './centerService'
import momoService from './momoService'
import InvoiceRepository from '~/repository/invoiceReposotory'
import courtRepository from '~/repository/courtRepository'
import userRepository from '~/repository/userRepository'
import centerRepository from '~/repository/centerRepository'
interface IbookingService {
  createBookingbyDay(listBooking: [any], totalprice: number, userId: string): Promise<any>
  checkAllSlotsAvailability(listBooking: [any]): Promise<boolean>
  createBooking(data: any, userId: string): Promise<any>
  getPersonalBooking(userId: string): Promise<any>
}
class bookingService implements IbookingService {
  async createBookingbyDay(listBooking: any, totalprice: number, userId: string) {
    const allSlotsAvailable = await this.checkAllSlotsAvailability(listBooking)
    if (!allSlotsAvailable) {
      throw new AppError('Xin lỗi slot đã được đặt hoặc đang được đặt, kiểm tra lại booking', 400)
    }
    //chuyển hướng tới payment nhận response từ payment
    const orderId = 'RacketRise' + new Date().getTime()
    const newInvoiceInstance = new InvoiceService()
    const newInvoice = await newInvoiceInstance.addInvoiceBookingbyDay(totalprice, userId, orderId)
    const listnewbooking = await Promise.all(
      listBooking.map(async (booking: any) => {
        booking.invoiceId = newInvoice._id
        const newbooking = await this.createBooking(booking, userId)
        return newbooking
      })
    )

    const bookingDetail = listBooking.map((booking: { date: any; start: any; end: any }) => {
      return `${booking.date} (${booking.start} - ${booking.end})`
    })
    const centerId = listBooking[0].centerId
    const centerServiceInstance = new centerService()
    const center = await centerServiceInstance.getCenterById(centerId)
    const orderInfo = 'Thanh toán đặt sân' + center.centerName + bookingDetail.join(',')
    const callbackUrl = '/api/v1/booking/callback-pay-booking-by-day'
    const paymentResult = await momoService.createPayment(orderInfo, totalprice, orderId, centerId, callbackUrl)
    return paymentResult
  }

  async createBooking(data: any, userId: string) {
    const slot = {
      courtId: data.courtId,
      date: data.date,
      start: data.start,
      end: data.start
    }

    const slotAvailable = []
    const timeSlotRepositoryInstance = new timeSlotRepository()

    while (new Date(`1970-01-01T${slot.end}:00`) < new Date(`1970-01-01T${data.end}:00`)) {
      const [hour, minute] = slot.start.split(':')
      if (minute === '00') {
        slot.end = `${hour}:30`
      } else {
        slot.end = `${(parseInt(hour) + 1).toString().padStart(2, '0')}:00`
      }

      const available = await timeSlotRepositoryInstance.checkTimeSlotAvailable(slot)
      if (!available) {
        throw new AppError('Slot not available', 400)
      }
      slotAvailable.push({ ...slot })
      slot.start = slot.end
    }
    const booking = { ...data, userId: userId, status: 'pending' }
    const newBooking = await bookingRepository.createBooking(booking)

    // Cập nhật trạng thái của các slot thành "booking"
    await Promise.all(
      slotAvailable.map(async (slot) => {
        await timeSlotRepositoryInstance.updateSlotStatus(slot, 'booking')
      })
    )
    return newBooking
  }

  async checkAllSlotsAvailability(listBooking: [any]) {
    const timeSlotRepositoryInstance = new timeSlotRepository()
    for (const booking of listBooking) {
      const slot = {
        courtId: booking.courtId,
        date: booking.date,
        start: booking.start,
        end: booking.start
      }
      while (new Date(`1970-01-01T${slot.end}:00`) < new Date(`1970-01-01T${booking.end}:00`)) {
        const [hour, minute] = slot.start.split(':')
        if (minute === '00') {
          slot.end = `${hour}:30`
        }
        if (minute === '30') {
          slot.end = `${(parseInt(hour) + 1).toString().padStart(2, '0')}:00`
        }
        //check slot trong khoảng booking có available không
        const available = await timeSlotRepositoryInstance.checkTimeSlotAvailable(slot)
        if (!available) {
          return false
        }
        slot.start = slot.end
      }
    }
    return true
  }

  async changeBookingStatusAfterPaySuccess(bookingId: string) {
    const booking = await bookingRepository.getBookingbyId(bookingId)
    console.log('booking', booking)
    if (!booking) {
      throw new AppError('Booking not found', 404)
    }
    const slot = {
      courtId: booking.courtId.toString(),
      date: booking.date,
      start: booking.start,
      end: booking.start
    }
    const slotAvailable = []
    const timeSlotRepositoryInstance = new timeSlotRepository()
    while (new Date(`1970-01-01T${slot.end}:00`) < new Date(`1970-01-01T${booking.end}:00`)) {
      const [hour, minute] = slot.start.split(':')
      if (minute === '00') {
        slot.end = `${hour}:30`
      } else {
        slot.end = `${(parseInt(hour) + 1).toString().padStart(2, '0')}:00`
      }
      slotAvailable.push({ ...slot })
      slot.start = slot.end
    }
    // Cập nhật trạng thái của các slot thành "booked"
    await Promise.all(
      slotAvailable.map(async (slot) => {
        await timeSlotRepositoryInstance.updateSlotStatus(slot, 'booked')
      })
    )
    booking.status = 'confirmed'
    return bookingRepository.updateBooking({ _id: booking._id }, booking)
  }

  async changeBookingStatusAfterPayFail(bookingId: string) {
    const booking = await bookingRepository.getBookingbyId(bookingId)
    console.log('booking', booking)
    if (!booking) {
      throw new AppError('Booking not found', 404)
    }
    const slot = {
      courtId: booking.courtId.toString(),
      date: booking.date,
      start: booking.start,
      end: booking.start
    }
    const slotAvailable = []
    const timeSlotRepositoryInstance = new timeSlotRepository()
    while (new Date(`1970-01-01T${slot.end}:00`) < new Date(`1970-01-01T${booking.end}:00`)) {
      const [hour, minute] = slot.start.split(':')
      if (minute === '00') {
        slot.end = `${hour}:30`
      } else {
        slot.end = `${(parseInt(hour) + 1).toString().padStart(2, '0')}:00`
      }
      slotAvailable.push({ ...slot })
      slot.start = slot.end
    }
    // Cập nhật trạng thái của các slot thành "booked"
    await Promise.all(
      slotAvailable.map(async (slot) => {
        await timeSlotRepositoryInstance.updateSlotStatus(slot, 'available')
      })
    )
    return bookingRepository.deleteBooking({ _id: booking._id })
  }

  async callbackPayBookingByDay(reqBody: any) {
    console.log('vao dc callback', reqBody)
    const invoiceServiceInstance = new InvoiceService()
    if (reqBody.resultCode !== 0) {
      console.log('vao fail')
      const invoice = await invoiceServiceInstance.getInvoicesByInvoiceID(reqBody.orderId)
      const listBooking = await bookingRepository.getListBooking({ invoiceId: invoice._id })
      await Promise.all(
        listBooking.map(async (booking: any) => {
          await this.changeBookingStatusAfterPayFail(booking._id)
        })
      )
      await invoiceServiceInstance.deleteInvoiceById(invoice._id)
      return { status: 'fail' }
    }

    const invoice = await invoiceServiceInstance.paidIvoice(reqBody.orderId)
    if (!invoice) {
      throw new AppError('Invoice not found', 404)
    }
    const listBooking = await bookingRepository.getListBooking({ invoiceId: invoice._id })
    await Promise.all(
      listBooking.map(async (booking: any) => {
        await this.changeBookingStatusAfterPaySuccess(booking._id)
      })
    )
    return { status: 'success' }
  }

  async getBookingByDayAndCenter(centerId: string, date: string) {
    const courtRepositoryInstance = new courtRepository()
    const listCourt = await courtRepositoryInstance.getListCourt({ centerId })
    console.log('date', date)
    const userRepositoryInstance = new userRepository()
    const bookingIncourt: any[] = await Promise.all(
      listCourt.map(async (court: any) => {
        const bookings = await bookingRepository.getListBooking({
          courtId: court._id,
          date: date,
          status: 'confirmed'
        })
        const bookingsWithUser = await Promise.all(
          bookings.map(async (booking: any) => {
            const user = await userRepositoryInstance.findUser({ _id: booking.userId })
            if (!user)
              return {
                ...booking._doc,
                customerName: 'Khách hàng không tồn tại',
                customerEmail: 'Khách hàng không tồn tại',
                customerPhone: 'Khách hàng không tồn tại'
              }
            return {
              ...booking._doc,
              customerName: user.userName,
              customerEmail: user.userEmail,
              customerPhone: user.userPhone
            }
          })
        )
        return { courtid: court._id, courtnumber: court.courtNumber, bookings: bookingsWithUser }
      })
    )

    console.log('bookingIncourt', bookingIncourt)
    return bookingIncourt
  }

  async getPersonalBooking(userId: string) {
    const bookings = await bookingRepository.getListBooking({ userId })
    const bookingWithCenterAndCourt = await Promise.all(
      bookings.map(async (booking: any) => {
        const centerRepositoryInstance = new centerRepository()
        const center = await centerRepositoryInstance.getCenterById(booking.centerId)
        const courtRepositoryInstance = new courtRepository()
        const court = await courtRepositoryInstance.getCourt({ _id: booking.courtId })
        if (!center || !court) {
          return {
            ...booking._doc,
            centerName: 'Trung tâm không tồn tại',
            centerAddress: 'Trung tâm không tồn tại',
            courtNumber: 'Sân không tồn tại'
          }
        }
        return {
          ...booking._doc,
          centerName: center.centerName,
          centerAddress: center.location,
          courtNumber: court.courtNumber
        }
      })
    )
    return bookingWithCenterAndCourt
  }

  async checkAndUpdateBooking() {
    const currentTime = new Date()
    currentTime.setMinutes(currentTime.getMinutes() + 30) //sau 30 phut không checkin thì chuyển sang hết hạn
    const hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()

    // Round down to the nearest half hour
    minutes = Math.floor(minutes / 30) * 30

    // Format hours and minutes as 2 digits
    const formattedHours = hours < 10 ? '0' + hours : hours
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes

    const formattedTime = `${formattedHours}:${formattedMinutes}`
    const now = new Date()
    now.setUTCHours(0, 0, 0, 0)
    const listBooking = await bookingRepository.getListBooking({ date: now.toISOString() })
    await Promise.all(
      listBooking.map(async (booking) => {
        if (booking.status === 'confirmed' && booking.start <= formattedTime) {
          await bookingRepository.updateBooking({ _id: booking._id }, { status: 'expired' })
        }
      })
    )
  }
}
export default bookingService
