import CenterPackage from '~/models/centerPackageModel'

interface ICenterRepository {
  addCenterPackage(centerPackage: any): Promise<any>
  getListCenterPackage(query: any): Promise<any[]>
  getCenterPackage(query: any): Promise<any | null>
  getAllCenterPackage(): Promise<any[]>
}

class centerPackageRepository implements ICenterRepository {
  async addCenterPackage(centerPackage: any) {
    const newcenterPackage = new CenterPackage(centerPackage)
    return newcenterPackage.save()
  }
  async getListCenterPackage(query: any) {
    return await CenterPackage.find(query)
  }
  async getCenterPackage(query: any) {
    return await CenterPackage.findOne(query)
  }
  async getAllCenterPackage() {
    return await CenterPackage.find()
  }
 
}
export default centerPackageRepository
