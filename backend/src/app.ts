import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
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
app.use('/api/v1/court',courtRoute)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)
export default app
