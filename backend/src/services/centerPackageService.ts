import centerPackageRepository from '~/repository/centerPackageRepository'

class CenterPackageService {
  static async createCenterPackage(data: any) {
    const centerPackageRepositoryInstance = new centerPackageRepository()
    const newCenterPackage = await centerPackageRepositoryInstance.addCenterPackage(data)
    return newCenterPackage
  }

  static async getAllCenterPackage() {
    const centerPackageRepositoryInstance = new centerPackageRepository()
    const centerPackages = await centerPackageRepositoryInstance.getAllCenterPackage()
    return centerPackages
  }
}
export default CenterPackageService
