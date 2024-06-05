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
}
export default centerRepository
