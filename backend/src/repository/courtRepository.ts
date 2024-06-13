import Court from '~/models/courtModel'

class courtRepository {
  static async addCourt(court: any) {
    const newCourt = new Court(court)
    return newCourt.save()
  }
  static async getListCourt(query: any) {
    return await Court.find(query)
  }
  static async getCourt(query: any) {
    return await Court.findOne(query)
  }

  static async getListCourtId(query: any) {
    return await Court.find(query).select('_id')
  }
  static async getAllCourt() {
    return await Court.find().exec();
  }

}
export default courtRepository
