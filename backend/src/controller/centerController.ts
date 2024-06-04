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
}
export default centerController
