import courtService from '~/services/courtService'
import catchAsync from '~/utils/catchAsync'

class courtController {
  static getCourtByCenterId = catchAsync(async (req: any, res: any, next: any) => {
    const courtServiceInstance = new courtService()
    const courts = await courtServiceInstance.getCourtByCenterId(req.params.centerId)
    res.status(200).json({
      status: 'success',
      data: {
        courts
      }
    })
  })
  static getAllCourt = catchAsync(async (req: any, res: any, next: any) => {
    try {
      const courts = await courtService.getAllCourt()
      res.status(200).json(courts)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching court', error })
    }
  })
}
export default courtController
