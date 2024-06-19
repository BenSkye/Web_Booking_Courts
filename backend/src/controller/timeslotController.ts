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
  static getFreeStartTimeByCenterAndDateForUpdate = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, oldStart, oldEnd, courtId } = req.params
    console.log('oldStart', oldStart)
    console.log('oldEnd', oldEnd)
    const timeSlotServiceInstance = new timeSlotService()
    const freeStartTime = await timeSlotServiceInstance.getFreeStartTimeByCenterAndDateForUpdate(
      centerId,
      date,
      oldStart,
      oldEnd,
      courtId
    )
    res.status(200).json({
      status: 'success',
      data: {
        freeStartTime
      }
    })
  })
  static getMaxTimeAviableFromStartTimeForUpdate = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, start, oldStart, oldEnd, courtId } = req.params
    console.log('oldStart', oldStart)
    console.log('oldEnd', oldEnd)
    const timeSlotServiceInstance = new timeSlotService()
    const maxDuration = await timeSlotServiceInstance.getMaxTimeAviableFromStartTimeForUpdate(
      centerId,
      date,
      start,
      oldStart,
      oldEnd,
      courtId
    )
    res.status(200).json({
      status: 'success',
      data: {
        maxDuration
      }
    })
  })
  static getCourtByFreeSlotForUpdate = catchAsync(async (req: any, res: any, next: any) => {
    const { centerId, date, start, duration, oldStart, oldEnd, courtId } = req.params
    console.log('oldStart', oldStart)
    console.log('oldEnd', oldEnd)
    const timeSlotServiceInstance = new timeSlotService()
    const availableCourt = await timeSlotServiceInstance.getCourtByFreeSlotForUpdate(
      centerId,
      date,
      start,
      duration,
      oldStart,
      oldEnd,
      courtId
    )
    res.status(200).json({
      status: 'success',
      data: {
        courtFree: availableCourt
      }
    })
  })
}
export default timeSlotController
