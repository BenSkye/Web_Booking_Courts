import CenterPackage from "~/models/centerPackageModel"


class centerPackageRepository {
  static async addCenterPackage(centerPackage: any) {
    const newcenterPackage = new CenterPackage(centerPackage)
    return newcenterPackage.save()
  }
  static async getListCenterPackage(query: any) {
    return await CenterPackage.find(query)
  }
  static async getCenterPackage(query: any) {
    return await CenterPackage.findOne(query)
  }
}
export default centerPackageRepository
