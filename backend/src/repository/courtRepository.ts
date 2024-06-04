import Court from '~/models/courtModel'

class courtRepository {
  static async addCourt(court: any) {
    const newCourt = new Court(court)
    return newCourt.save()
  }
}
export default courtRepository
