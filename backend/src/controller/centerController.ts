import centerService from '~/services/centerService'
import AppError from '~/utils/appError'
import catchAsync from '~/utils/catchAsync'

class centerController {
  static createCenter = catchAsync(async (req: any, res: any, next: any) => {
    req.body = { ...req.body, user: req.user._id }
    const { newcenter, newPrices, newCourts } = await centerService.addCenter(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        newcenter,
        newPrices,
        newCourts
      }
    })
  })
  static getPersonalCenters = catchAsync(async (req: any, res: any, next: any) => {
    const center = await centerService.getPersonalCenters(req.user._id)
    if (!center) return next(new AppError('No center found', 404))
    res.status(200).json({
      status: 'success',
      data: {
        center
      }
    })
  })
  static getPersonalCenterDetail = catchAsync(async (req: any, res: any, next: any) => {
    const { center, prices } = await centerService.getPersonalCenterById(req.params.centerId, req.user._id)
    if (!center) return next(new AppError('No center found', 404))
    res.status(200).json({
      status: 'success',
      data: {
        center,
        prices
      }
    })
  })
}
export default centerController
