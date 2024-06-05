import Center from '~/models/centerModel'

class centerRepository {
  static async addCenter(center: any) {
    const newcenter = new Center(center)
    return newcenter.save()
  }
  static async getListCenter(query: any) {
    return await Center.find(query)
  }
  static async getCenter(query: any) {
    return await Center.findOne(query)
  }
  static async updateCenter(query: any, data: any) {
    return await Center.findOneAndUpdate(query, data, { new: true })
  }
}
export default centerRepository
