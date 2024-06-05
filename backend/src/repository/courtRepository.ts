import Court from '~/models/courtModel'

class courtRepository {
  static async addCourt(court: any) {
    const newCourt = new Court(court)
    return newCourt.save()
  }
  static async getListCourt(query: any) {
    return await Court.find(query)
  }
}
export default courtRepository
