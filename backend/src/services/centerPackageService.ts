import CenterPackageRepository from '~/repository/centerPackageRepository';

class CenterPackageService {
  static async createCenterPackage(data: any) {
    const centerPackageRepositoryInstance = new CenterPackageRepository();
    const newCenterPackage = await centerPackageRepositoryInstance.addCenterPackage(data);
    return newCenterPackage;
  }

  static async getAllCenterPackage() {
    const centerPackageRepositoryInstance = new CenterPackageRepository();
    const centerPackages = await centerPackageRepositoryInstance.getAllCenterPackage();
    return centerPackages;
  }

 
}

export default CenterPackageService;
