/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import httpStatus from 'http-status'
import { TErrorSources } from '../interface/error'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import config from '../config'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import AppError from '../errors/appError'

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
  } else if (err?.name === 'ValidationError') {
    const simpliFiedError = handleValidationError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simpliFiedError = handleCastError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.code === '11000') {
    const simpliFiedError = handleDuplicateError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err instanceof AppError) {
    ;(statusCode = err?.statusCode),
      (message = err.message),
      (errorSources = [
        {
          path: '',
          message: err?.message,
        },
      ])
  } else if (err instanceof Error) {
    message = err.message
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler

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
