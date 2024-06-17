import { Schema } from 'mongoose'
import FixedPackageSchedule from '~/models/fixedPackageScheduleModel'

interface IFixedPackageSchedule {
  centerId: Schema.Types.ObjectId
  courtId: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
  startDate: Date
  endDate: Date
  playDates: Date[]
  bookings: Schema.Types.ObjectId[]
  bookingType: 'byday' | 'bymonth'
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'expired'
  invoiceId: Schema.Types.ObjectId
  totalPrice: number
}

interface IFixedPackageScheduleRepository {
  addFixedPackageSchedule(fixedPackageSchedule: IFixedPackageSchedule): Promise<any>
  getFixedPackageScheduleById(id: any): Promise<any | null>
  getFixedPackageSchedule(query: object): Promise<any | null>
  updateFixedPackageSchedule(query: object, data: any): Promise<any | null>
}

class fixedPackageScheduleRepository implements IFixedPackageScheduleRepository {
  async addFixedPackageSchedule(fixedPackageSchedule: IFixedPackageSchedule) {
    const newFixedPackageSchedule = new FixedPackageSchedule(fixedPackageSchedule)
    return newFixedPackageSchedule.save()
  }

  async getFixedPackageScheduleById(id: any) {
    try {
      const fixedPackageSchedule = await FixedPackageSchedule.findOne(id)
      if (!fixedPackageSchedule) {
        throw new Error(`FixedPackageSchedule with id ${id} not found`)
      }
      return fixedPackageSchedule
    } catch (error) {
      throw new Error(`Could not fetch FixedPackageSchedule: ${(error as Error).message}`)
    }
  }

  async getFixedPackageSchedule(query: object) {
    return await FixedPackageSchedule.findOne(query)
  }

  async updateFixedPackageSchedule(query: object, data: any) {
    return await FixedPackageSchedule.findOneAndUpdate(query, data, { new: true })
  }
}

export default fixedPackageScheduleRepository
