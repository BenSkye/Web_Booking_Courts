import centerService from '~/services/centerService'
import AppError from '~/utils/appError'
import catchAsync from '~/utils/catchAsync'

class centerController {
  static createCenter = catchAsync(async (req: any, res: any, next: any) => {
    req.body = { ...req.body, user: req.user._id }
    const centerServiceInstance = new centerService()
    const { newcenter, newPrices, newCourts } = await centerServiceInstance.addCenter(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        newcenter,
        newPrices,
        newCourts
      }
    })
  })
  static getAllCenters = catchAsync(async (req: any, res: any, next: any) => {
    const centerServiceInstance = new centerService()
    const centers = await centerServiceInstance.getAllCenters()
    res.status(200).json({
      status: 'success',
      data: {
        centers
      }
    })
  })

  static getCenterById = catchAsync(async (req: any, res: any, next: any) => {
    const centerServiceInstance = new centerService()
    const center = await centerServiceInstance.getCenterById(req.params.id)
    if (!center) {
      return next(new AppError('No center found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        center
      }
    })
  })

  static getPersonalCenters = catchAsync(async (req: any, res: any, next: any) => {
    const centerServiceInstance = new centerService()

    const center = await centerServiceInstance.getPersonalCenters(req.user._id)
    if (!center) return next(new AppError('No center found', 404))
    res.status(200).json({
      status: 'success',
      data: {
        center
      }
    })
  })
  static getPersonalActiveCenters = catchAsync(async (req: any, res: any, next: any) => {
    const centerServiceInstance = new centerService()
    const center = await centerServiceInstance.getPersonalActiveCenters(req.user._id)
    if (!center) return next(new AppError('No center found', 404))
    res.status(200).json({
      status: 'success',
      data: {
        center
      }
    })
  })
  static getPersonalCenterDetail = catchAsync(async (req: any, res: any, next: any) => {
    const centerServiceInstance = new centerService()
    const { center, prices } = await centerServiceInstance.getPersonalCenterById(req.params.centerId, req.user._id)
    if (!center) return next(new AppError('No center found', 404))
    res.status(200).json({
      status: 'success',
      data: {
        center,
        prices
      }
    })
  })
  static selectPackage = catchAsync(async (req: any, res: any, next: any) => {
    const centerServiceInstance = new centerService()
    const center = await centerServiceInstance.selectPackage(req.params.centerId, req.params.packageId, req.user._id)
    res.status(200).json({
      status: 'success',
      data: {
        center
      }
    })
  })
  static changeCenterStatusAccept = catchAsync(async (req: any, res: any, next: any) => {
    const centerServiceInstance = new centerService()
    const center = await centerServiceInstance.changeCenterStatusAccept(req.params.centerId)
    res.status(200).json({
      status: 'success',
      data: {
        center
      }
    })
  })
  static updateCenterInforById = catchAsync(async (req: any, res: any, next: any) => {
    const userId = req.user._id
    const centerServiceInstance = new centerService()
    const updatedCenter = await centerServiceInstance.updateCenterInforById(req.params.centerId, req.body, userId)
    if (!updatedCenter) {
      return next(new AppError('No center found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        center: updatedCenter
      }
    })
  })
}
export default centerController
