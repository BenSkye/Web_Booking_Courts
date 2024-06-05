import centerPackageRepository from '~/repository/centerPackageRepository'

class CenterPackageService {
  static async createCenterPackage(data: any) {
    const newCenterPackage = await centerPackageRepository.addCenterPackage(data)
    return newCenterPackage
  }
}
export default CenterPackageService
