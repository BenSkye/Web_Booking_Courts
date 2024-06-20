import CenterPackageService from '~/services/centerPackageService'
import catchAsync from '~/utils/catchAsync'

class CenterPackageController {
  static createCenterPackage = catchAsync(async (req: any, res: any, next: any) => {
    const newCenterPackage = await CenterPackageService.createCenterPackage(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        newCenterPackage
      }
    })
  })
  static getAllCenterPackage = catchAsync(async (req: any, res: any, next: any) => {
    const centerPackages = await CenterPackageService.getAllCenterPackage()
    res.status(200).json({
      status: 'success',
      data: {
        centerPackages
      }
    })
  })
}
export default CenterPackageController
