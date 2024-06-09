import timeSlotService from '~/services/timeslotService'
import catchAsync from '~/utils/catchAsync'

class timeSlotController {
  static getFreeStrartTimeByCenterAndDate = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date } = req.params
    const freeStartTime = await timeSlotService.getFreeStartTimeByCenterAndDate(centerId, date)
    res.status(200).json({
      status: 'success',
      data: {
        freeStartTime
      }
    })
  })
  static getMaxTimeAviableFromStartTime = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, start } = req.params
    const maxDuration = await timeSlotService.getMaxTimeAviableFromStartTime(centerId, date, start)
    res.status(200).json({
      status: 'success',
      data: {
        maxDuration
      }
    })
  })
  static getCourtByFreeSlot = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, start, duration } = req.params
    const availableCourt = await timeSlotService.getCourtByFreeSlot(centerId, date, start, duration)
    res.status(200).json({
      status: 'success',
      data: {
        courtFree: availableCourt
      }
    })
  })
}
export default timeSlotController
