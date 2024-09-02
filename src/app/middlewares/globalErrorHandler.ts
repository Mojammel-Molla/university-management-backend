/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const massage = err.massage || 'Something went wrong'

  return res.status(httpStatus.MISDIRECTED_REQUEST).json({
    success: false,
    massage,
    error: err,
  })
}

export default globalErrorHandler
