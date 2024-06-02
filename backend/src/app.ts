import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import AppError from './utils/appError'
import errorHandler from './controller/errorController'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)
export default app
