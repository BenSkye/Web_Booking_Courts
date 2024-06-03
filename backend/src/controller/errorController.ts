import { Request, Response, NextFunction } from 'express'
import AppError from '~/utils/appError'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  // res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}

export default errorHandler
