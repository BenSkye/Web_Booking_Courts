import Center from '~/models/centerModel'

class centerRepository {
  static async addCenter(center: any) {
    const newcenter = new Center(center)
    return newcenter.save()
  }
}
export default centerRepository
