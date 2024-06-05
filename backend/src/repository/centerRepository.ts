import Center from '~/models/centerModel'

class centerRepository {
  static async addCenter(center: any) {
    const newcenter = new Center(center)
    return newcenter.save()
  }
  static async getAllCenters() {
    try {
      const centers = await Center.find()
      return centers
    } catch (error) {
      throw new Error(`Could not fetch centers: ${(error as Error).message}`)
    }
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
