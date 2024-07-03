import tournamentRepository from '~/repository/tournamentRepository'

interface ItournamentService {
  addTournament(data: any, userId: string): Promise<any>
  getTournamentById(id: string): Promise<any>
  getPersonalTournaments(userId: string): Promise<any>
  getTournaments(): Promise<any>
  getTournamentByCenterId(centerId: string): Promise<any>
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
}
export default tournamentService
