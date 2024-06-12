import timeSlotService from '~/services/timeslotService'
import catchAsync from '~/utils/catchAsync'

class timeSlotController {
  static getFreeStrartTimeByCenterAndDate = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date } = req.params
    const timeSlotServiceInstance = new timeSlotService()
    const freeStartTime = await timeSlotServiceInstance.getFreeStartTimeByCenterAndDate(centerId, date)
    res.status(200).json({
      status: 'success',
      data: {
        freeStartTime
      }
    })
  })
  static getMaxTimeAviableFromStartTime = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, start } = req.params
    const timeSlotServiceInstance = new timeSlotService()
    const maxDuration = await timeSlotServiceInstance.getMaxTimeAviableFromStartTime(centerId, date, start)
    res.status(200).json({
      status: 'success',
      data: {
        maxDuration
      }
    })
  })
  static getCourtByFreeSlot = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, start, duration } = req.params
    const timeSlotServiceInstance = new timeSlotService()
    const availableCourt = await timeSlotServiceInstance.getCourtByFreeSlot(centerId, date, start, duration)
    res.status(200).json({
      status: 'success',
      data: {
        courtFree: availableCourt
      }
    })
  })
}
export default timeSlotController
