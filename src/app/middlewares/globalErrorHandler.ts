/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import httpStatus from 'http-status'
import { TErrorSources } from '../interface/error'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!!',
    },
  ]

  if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  }

  return res.status(httpStatus.MISDIRECTED_REQUEST).json({
    success: false,
    massage,
    error: err,
  })
}

export default globalErrorHandler

//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/
