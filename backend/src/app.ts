import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cron from 'node-cron'
import bodyParser from 'body-parser'
import AppError from './utils/appError'
import errorHandler from './controller/errorController'
import authRoute from './routes/authRoute'
import centerRoute from './routes/centerRoute'
import centerPackageRoute from './routes/centerPackageRoute'
import bookingRoute from './routes/bookingRoute'
import timeslotRoute from './routes/timeslotRoute'
import priceRoute from './routes/priceRoute'
import momoRoute from './routes/momoRoute'
import courtRoute from './routes/courtRoute'
import invoiceRoute from './routes/invoiceRoutes'
import userRoute from './routes/userRoute'
import timeSlotService from './services/timeslotService'
import bookingService from './services/bookingService'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/center', centerRoute)
app.use('/api/v1/centerpackage', centerPackageRoute)
app.use('/api/v1/booking', bookingRoute)
app.use('/api/v1/timeSlot', timeslotRoute)
app.use('/api/v1/price', priceRoute)
app.use('/api/v1/payment', momoRoute)
app.use('/api/v1/court', courtRoute)
app.use('/api/v1/invoice', invoiceRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/court', courtRoute)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

cron.schedule('0,30 * * * *', async () => {
  console.log('Cron job started at', new Date().toISOString())
  const timeSlotServiceInstance = new timeSlotService()
  await timeSlotServiceInstance.checkAndUpdateTimeSlots() //cập nhật hếthạn cho những slot đã qua giờ hiện tại
  const bookingServiceInstance = new bookingService()
  await bookingServiceInstance.checkAndUpdateBooking() // câp nhật hết hạn cho những booking chưa checkin  sau 30 phút
})

app.use(errorHandler)
export default app
