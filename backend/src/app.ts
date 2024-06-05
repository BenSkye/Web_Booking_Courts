import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import AppError from './utils/appError'
import errorHandler from './controller/errorController'
import authRoute from './routes/authRoute'
import centerRoute from './routes/centerRoute'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/centers', centerRoute)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)
export default app
