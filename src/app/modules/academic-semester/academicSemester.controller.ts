import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  })
})

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic semesters retrieve successfully',
    data: result,
  })
})
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
    semesterId
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic semester retrieve successfully',
    data: result,
  })
})
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester update successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
