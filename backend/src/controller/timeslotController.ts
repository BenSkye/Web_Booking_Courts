import timeSlotService from '~/services/timeslotService'
import catchAsync from '~/utils/catchAsync'

class timeSlotController {
  static getFreeSlotByCenterAndDate = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date } = req.params
    const freeSlots = await timeSlotService.getFreeStartTimeByCenterAndDate(centerId, date)
    res.status(200).json({
      status: 'success',
      data: {
        freeSlots
      }
    })
  })
  static getMaxTimeAviableFromStartTime = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, start } = req.params
    const maxfretime = await timeSlotService.getMaxTimeAviableFromStartTime(centerId, date, start)
    res.status(200).json({
      status: 'success',
      data: {
        maxfretime
      }
    })
  })
  static getCourtByFreeSlot = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, start, duration } = req.params
    const courtFree = await timeSlotService.getCourtByFreeSlot(centerId, date, start, duration)
    res.status(200).json({
      status: 'success',
      data: {
        courtFree
      }
    })
  })
}
export default timeSlotController
