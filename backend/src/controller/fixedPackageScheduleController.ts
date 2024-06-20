import fixedPackageScheduleService from '~/services/fixedPackageScheduleService'
import catchAsync from '~/utils/catchAsync'

class fixedPackageScheduleController {
  static addFixedPackageSchedule = catchAsync(async (req: any, res: any, next: any) => {
    const userId = req.user._id
    const fixedPackageScheduleServiceInstance = new fixedPackageScheduleService()
    const fixedPackageSchedule = await fixedPackageScheduleServiceInstance.addFixedPackageSchedule(userId, req.body)
    res.status(201).json({
      status: 'success',
      data: {
        fixedPackageSchedule
      }
    })
  })

  static getFixedPackageScheduleById = catchAsync(async (req: any, res: any, next: any) => {
    const fixedPackageScheduleServiceInstance = new fixedPackageScheduleService()
    const fixedPackageSchedule = await fixedPackageScheduleServiceInstance.getFixedPackageScheduleById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        fixedPackageSchedule
      }
    })
  })

  static getFixedPackageSchedule = catchAsync(async (req: any, res: any, next: any) => {
    const fixedPackageScheduleServiceInstance = new fixedPackageScheduleService()
    const fixedPackageSchedule = await fixedPackageScheduleServiceInstance.getFixedPackageSchedule(req.query)
    res.status(200).json({
      status: 'success',
      data: {
        fixedPackageSchedule
      }
    })
  })
}

export default fixedPackageScheduleController
