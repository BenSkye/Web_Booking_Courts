import Tournament from '~/models/tournamentModel'

interface ItournamentRepository {
  addTournament(tournament: any): Promise<any>
  getTournament(query: any): Promise<any>
  getTournaments(query: any): Promise<any>
}

class tournamentRepository implements ItournamentRepository {
  async addTournament(tournament: any) {
    const newTournament = new Tournament(tournament)
    return newTournament.save()
  }
  async getTournament(query: any) {
    return await Tournament.findOne(query).populate('centerId')
  }
  async getTournaments(query: any) {
    return await Tournament.find(query).populate('centerId')
  }
}

export default tournamentRepository
