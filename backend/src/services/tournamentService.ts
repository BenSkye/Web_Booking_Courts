import CenterRepository from '~/repository/centerRepository'
import courtRepository from '~/repository/courtRepository'
import timeSlotRepository from '~/repository/timeslotRepository'
import tournamentRepository from '~/repository/tournamentRepository'
import AppError from '~/utils/appError'
import momoService from './momoService'
import bookingRepository from '~/repository/bookingRepository'
import InvoiceRepository from '~/repository/invoiceReposotory'

interface ItournamentService {
  addTournament(data: any, userId: string): Promise<any>
  getTournamentById(id: string): Promise<any>
  getPersonalTournaments(userId: string): Promise<any>
  getTournaments(): Promise<any>
  getTournamentByCenterId(centerId: string): Promise<any>
  approveTournament(tournamentId: string, pricePerDay: number): Promise<any>
  denyTournament(tournamentId: string): Promise<any>
  cancelBookingAndApproveTournament(
    tournamentId: string,
    pricePerDay: number,
    totalAmount: number,
    listBookingId: [any]
  ): Promise<any>
  callbackCancelBookingAndApproveTournament(data: any): Promise<any>
  cancelTournament(userId: string, tournamentId: string): Promise<any>
  confirmTournament(tournamentId: string): Promise<any>
  callbackConfirmTournament(data: any): Promise<any>
  getTournamentByInvoiceId(invoiceId: string): Promise<any>
  completedTournament(): Promise<any>
}

class tournamentService implements ItournamentService {
  async addTournament(data: any, userId: string) {
    console.log('data', data)
    const tournament = { ...data, userId: userId, status: 'pending' }
    const tournamentRepositoryInstance = new tournamentRepository()
    const newTournament = await tournamentRepositoryInstance.addTournament(tournament)
    return newTournament
  }
  async getTournamentById(id: string) {
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournament = await tournamentRepositoryInstance.getTournament({ _id: id })
    return tournament
  }
  async getPersonalTournaments(userId: string) {
    console.log('userId', userId)
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournaments = await tournamentRepositoryInstance.getTournaments({ userId: userId })
    return tournaments
  }
  async getTournaments() {
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournaments = await tournamentRepositoryInstance.getTournaments({})
    return tournaments
  }
  async getTournamentByCenterId(centerId: string) {
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournaments = await tournamentRepositoryInstance.getTournaments({ centerId: centerId })
    return tournaments
  }
  async approveTournament(tournamentId: string, pricePerDay: number) {
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournament = await tournamentRepositoryInstance.getTournamentById(tournamentId)

    if (!tournament) {
      throw new AppError('Tournament not found', 404)
    }

    const totalDay =
      (Number(new Date(tournament.endDate)) - Number(new Date(tournament.startDate))) / (1000 * 60 * 60 * 24) + 1
    console.log('totalDay', totalDay)
    const price = pricePerDay * totalDay

    const updatedTournament = await tournamentRepositoryInstance.updateTournament({
      _id: tournamentId,
      status: 'approved',
      price: price
    })

    const courtRepositoryInstance = new courtRepository()
    const listcourtId = await courtRepositoryInstance.getListCourtId({ centerId: tournament.centerId })
    console.log('listcourtId', listcourtId)
    const timeSlotRepositoryInstance = new timeSlotRepository()

    const startDate = new Date(tournament.startDate)
    const endDate = new Date(tournament.endDate)
    const centerRepositoryInstance = new CenterRepository()
    for (const court of listcourtId) {
      console.log('courtId', court._id)
      const currentDate = new Date(startDate)
      while (currentDate <= endDate) {
        const timeSlot = await timeSlotRepositoryInstance.getTimeslot({
          courtId: court._id,
          date: currentDate
        })
        const courtId = court._id.toString()
        const date = currentDate
        console.log('date', date)
        const slots = timeSlot?.slot || []

        for (const slot of slots) {
          await timeSlotRepositoryInstance.updateSlotStatus(
            { courtId, date, start: slot.start, end: slot.end },
            'booking'
          )
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }
    }
    return updatedTournament
  }
  async denyTournament(tournamentId: string) {
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournament = await tournamentRepositoryInstance.getTournamentById(tournamentId)

    if (!tournament) {
      throw new AppError('Tournament not found', 404)
    }

    const updatedTournament = await tournamentRepositoryInstance.updateTournament({
      _id: tournamentId,
      status: 'denied'
    })

    return updatedTournament
  }
  async cancelBookingAndApproveTournament(
    tournamentId: string,
    pricePerDay: number,
    totalAmount: number,
    listBookingId: [any]
  ) {
    console.log('listBookingId', listBookingId)
    console.log('totalAmount', totalAmount)
    console.log('pricePerDay', pricePerDay)
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournaments = await tournamentRepositoryInstance.getTournaments({ _id: tournamentId })
    const centerId = ''
    const orderInfo = 'Thanh toán hủy đặt sân'
    const callbackUrl = '/api/v1/tournament/callback-cancel-booking-and-approved-tournament'
    const redirect = '/manager-tournament/detail/' + tournamentId
    const totalprice = totalAmount
    const orderId = 'CB' + new Date().getTime()
    const extraData = `{"pricePerDay":${pricePerDay},"tournamentId":"${tournamentId}","listBookingId":[${listBookingId.map((id) => `"${id}"`).join(',')}]}`
    const paymentResult = await momoService.createPayment(
      orderInfo,
      totalprice,
      orderId,
      centerId,
      callbackUrl,
      extraData,
      redirect
    )
    return paymentResult
  }
  async callbackCancelBookingAndApproveTournament(data: any) {
    try {
      if (data.resultCode === 0) {
        const extraData = JSON.parse(data.extraData)
        console.log('extraData', extraData)
        await this.approveTournament(extraData.tournamentId, extraData.pricePerDay)
        for (const bookingId of extraData.listBookingId) {
          await bookingRepository.updateBooking({ _id: { $in: bookingId } }, { status: 'cancelled' })
        }
        console.log('Payment success')
      } else {
        console.log('Payment failed')
      }
    } catch (error) {
      console.error('Error parsing extraData:', data.extraData, error)
    }
  }
  async cancelTournament(userId: string, tournamentId: string) {
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournament = await tournamentRepositoryInstance.getTournamentById(tournamentId)

    if (!tournament) {
      throw new AppError('Tournament not found', 404)
    }

    console.log('tournament.userId', tournament.userId.toString())
    console.log('userId', userId)
    if (tournament.userId.toString() !== userId.toString()) {
      throw new AppError('You are not authorized to cancel this tournament', 403)
    }

    const updatedTournament = await tournamentRepositoryInstance.updateTournament({
      _id: tournamentId,
      status: 'cancelled'
    })

    return updatedTournament
  }
  async confirmTournament(tournamentId: string) {
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournament = await tournamentRepositoryInstance.getTournamentById(tournamentId)

    if (!tournament) {
      throw new AppError('Tournament not found', 404)
    }
    const centerId = tournament.centerId.toString()
    const orderInfo = 'Thanh toán tổ chức giải đấu'
    const callbackUrl = '/api/v1/tournament/callback-confirm-tournament'
    const redirect = '/tournament/detail/' + tournamentId
    const totalprice = tournament.price || 0
    const orderId = 'TB' + new Date().getTime()
    const extraData = `{"tournamentId":"${tournamentId}","orderId":"${orderId}"}`
    const paymentResult = await momoService.createPayment(
      orderInfo,
      totalprice,
      orderId,
      centerId,
      callbackUrl,
      extraData,
      redirect
    )
    return paymentResult
  }
  async callbackConfirmTournament(data: any) {
    try {
      if (data.resultCode === 0) {
        const extraData = JSON.parse(data.extraData)
        console.log('extraData', extraData)

        const tournamentRepositoryInstance = new tournamentRepository()
        const tournament = await tournamentRepositoryInstance.getTournamentById(extraData.tournamentId)
        if (!tournament) {
          throw new AppError('Tournament not found', 404)
        }
        const centerRepositoryInstance = new CenterRepository()
        const center = await centerRepositoryInstance.getCenterById(tournament.centerId)
        const courtRepositoryInstance = new courtRepository()
        const listcourtId = await courtRepositoryInstance.getListCourtId({ centerId: tournament.centerId })
        const timeSlotRepositoryInstance = new timeSlotRepository()

        const startDate = new Date(tournament.startDate)
        const endDate = new Date(tournament.endDate)
        for (const court of listcourtId) {
          console.log('courtId', court._id)
          const currentDate = new Date(startDate)
          while (currentDate <= endDate) {
            const timeSlot = await timeSlotRepositoryInstance.getTimeslot({
              courtId: court._id,
              date: currentDate
            })
            const courtId = court._id.toString()
            const date = currentDate
            console.log('date', date)
            const slots = timeSlot?.slot || []

            for (const slot of slots) {
              await timeSlotRepositoryInstance.updateSlotStatus(
                { courtId, date, start: slot.start, end: slot.end },
                'booked'
              )
            }
            const booking = {
              // Define booking details here, without relying on `data`
              userId: tournament.userId,
              centerId: tournament.centerId,
              courtId: court._id,
              date: currentDate,
              start: center.openTime,
              end: center.closeTime,
              bookingType: 'tournament',
              status: 'confirmed',
              tournamentId: tournament._id
            }
            const newBooking = await bookingRepository.createBooking(booking)
            console.log('newBooking', newBooking)
            currentDate.setDate(currentDate.getDate() + 1)
          }
        }

        const InvoiceRepositoryInstance = new InvoiceRepository()
        const newInvoice = {
          invoiceID: extraData.orderId,
          price: tournament.price,
          userId: tournament.userId,
          status: 'paid',
          invoiceFor: 'BT' //booking tournament
        }
        const invoice = await InvoiceRepositoryInstance.addInvoice(newInvoice)
        tournamentRepositoryInstance.updateTournament({
          _id: extraData.tournamentId,
          status: 'confirm',
          invoiceId: invoice._id
        })
      } else {
        console.log('Payment failed')
      }
    } catch (error) {
      console.error('Error parsing extraData:', data.extraData, error)
    }
  }
  async getTournamentByInvoiceId(invoiceId: string) {
    const tournamentRepositoryInstance = new tournamentRepository()
    const tournament = await tournamentRepositoryInstance.getTournament({ invoiceId: invoiceId })
    return tournament
  }
  async completedTournament() {
    const tournamentRepositoryInstance = new tournamentRepository()
    const currentDate = new Date()
    const tournaments = await tournamentRepositoryInstance.getTournaments({ status: 'confirm' })
    for (const tournament of tournaments) {
      if (new Date(tournament.endDate) < currentDate) {
        await tournamentRepositoryInstance.updateTournament({ _id: tournament._id, status: 'completed' })
      }
    }
  }
}
export default tournamentService
