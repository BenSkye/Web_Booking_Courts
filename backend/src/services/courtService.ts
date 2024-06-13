import courtRepository from '~/repository/courtRepository'
import timeSlotRepository from '~/repository/timeslotRepository'

interface ICourtService {
    getCourtByCenterId(centerId: string): Promise<any>
}
class courtService implements ICourtService {
    async getCourtByCenterId(centerId: string) {
        const courtRepositoryInstance = new courtRepository()
        const courts = await courtRepositoryInstance.getListCourt({ centerId })
        return courts
    }
}
export default courtService
