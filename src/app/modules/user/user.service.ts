import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemesterModel } from '../academic-semester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_pass as string)
  userData.role = 'student'
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  )

  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid admission semester ID')
  }
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    userData.id = await generateStudentId(admissionSemester)

    const newUser = await UserModel.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newStudent = await StudentModel.create([payload], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    return newStudent
  } catch (error) {
    await session.abortTransaction()

    throw new AppError(httpStatus.BAD_REQUEST, 'Operation failed')
  } finally {
    session.endSession()
  }
}

const getUsersFromDB = async () => {
  const result = await UserModel.find()
  return result
}
export const UserServices = {
  createStudentIntoDB,
  getUsersFromDB,
}
