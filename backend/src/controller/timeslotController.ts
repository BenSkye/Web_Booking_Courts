import timeSlotService from '~/services/timeslotService'

class timeSlotController {
  static getFreeSlotByCenterAndDate = async (req: any, res: any, next: any) => {
    const { centerId, date } = req.params
    const freeSlots = await timeSlotService.getFreeStartTimeByCenterAndDate(centerId, date)
    res.status(200).json({
      status: 'success',
      data: {
        freeSlots
      }
    })
  }
  static getMaxTimeAviableFromStartTime = async (req: any, res: any, next: any) => {
    const { centerId, date, start } = req.params
    const maxfretime = await timeSlotService.getMaxTimeAviableFromStartTime(centerId, date, start)
    res.status(200).json({
      status: 'success',
      data: {
        maxfretime
      }
    })
  }
}
export default timeSlotController
