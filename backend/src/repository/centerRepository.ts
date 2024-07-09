import { Schema } from 'mongoose'
import Center from '~/models/centerModel'

interface ISubscription {
  packageId: Schema.Types.ObjectId
  activationDate: Date
  expiryDate: Date
}

interface ICenter {
  managerId: Schema.Types.ObjectId
  centerName: string
  location: string
  openTime: string
  closeTime: string
  courtCount: number
  images: string[]
  imagesLicense: string[]
  services: string[]
  rule: string
  subscriptions?: ISubscription[]
  price?: Schema.Types.ObjectId[]
  status: 'pending' | 'accepted' | 'active' | 'expired' | 'rejected'
}

interface ICenterRepository {
  addCenter(center: ICenter): Promise<any>
  getAllCenters(): Promise<any[]>
  getCenterById(id: any): Promise<any | null>
  getCenterStartandEndTime(query: object): Promise<any | null>
  getListCenter(query: object): Promise<any[]>
  getCenter(query: object): Promise<any | null>
  updateCenter(query: object, data: any): Promise<any | null>
  getAllSubscriptions(): Promise<any[]>
  updateCenterInforById(id: any, data: any): Promise<any | null>
}

class CenterRepository implements ICenterRepository {
  async addCenter(center: ICenter): Promise<any> {
    try {
      const newCenter = new Center(center)
      return await newCenter.save()
    } catch (error) {
      throw new Error(`Could not add center: ${(error as Error).message}`)
    }
  }

  async getAllCenters(): Promise<any[]> {
    try {
      const centers = await Center.find().populate('price').populate('subscriptions.packageId')
      return centers;

    } catch (error) {
      throw new Error(`Could not fetch centers: ${(error as Error).message}`)
    }
  }

  async getCenterById(id: any) {
    try {
      const center = await Center.findOne(id).populate('')
      if (!center) {
        throw new Error(`Center with id ${id} not found`)
      }
      return center
    } catch (error) {
      throw new Error(`Could not fetch center: ${(error as Error).message}`)
    }
  }

  async getCenterStartandEndTime(query: object) {
    return await Center.findOne(query).select('openTime closeTime')
  }

  async getListCenter(query: object) {
    return await Center.find(query)
  }

  async getCenter(query: any) {
    return await Center.findOne(query).populate('price managerId')
  }

  async updateCenter(query: object, data: any) {
    return await Center.findOneAndUpdate(query, data, { new: true });
  }
  
  async getAllSubscriptions() {
    try {
      return await Center.find({ 'subscriptions.packageId': { $ne: null } })
        .populate('subscriptions.packageId')
        .exec()
    } catch (error) {
      throw new Error(`Could not fetch subscriptions: ${(error as Error).message}`)
    }
  }
  async updateCenterInforById(id: any, data: any) {
    try {
      const center = await Center.findByIdAndUpdate(id, data, { new: true })
      if (!center) {
        throw new Error(`Center with id ${id} not found`)
      }
      return center
    } catch (error) {
      throw new Error(`Could not update center: ${(error as Error).message}`)
    }
  }
}
export default CenterRepository
