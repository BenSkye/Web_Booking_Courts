import courtRepository from '~/repository/courtRepository'
import timeSlotRepository from '~/repository/timeslotRepository'

class courtService {


    static async getAllCourt() {
        return await courtRepository.getAllCourt();
      }
}
export default courtService
