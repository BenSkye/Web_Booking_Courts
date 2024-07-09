import CenterRepository from '~/repository/centerRepository'
import courtRepository from '~/repository/courtRepository'
import timeSlotRepository from '~/repository/timeslotRepository'
import tournamentRepository from '~/repository/tournamentRepository'
import AppError from '~/utils/appError'

interface ItournamentService {
  addTournament(data: any, userId: string): Promise<any>
  getTournamentById(id: string): Promise<any>
  getPersonalTournaments(userId: string): Promise<any>
  getTournaments(): Promise<any>
  getTournamentByCenterId(centerId: string): Promise<any>
  approveTournament(tournamentId: string, pricePerDay: number): Promise<any>
  denyTournament(tournamentId: string): Promise<any>
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

        slots.map(async (slot) => {
          await timeSlotRepositoryInstance.updateSlotStatus(
            { courtId, date, start: slot.start, end: slot.end },
            'booking'
          )
        })
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
}
export default tournamentService
