import { Request, Response, NextFunction } from 'express'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}

export default errorHandler
