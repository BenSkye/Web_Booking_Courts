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
}
export default timeSlotController
