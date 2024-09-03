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

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set generated id
    userData.id = await generateStudentId(admissionSemester)

    //create a user transaction-1
    const newUser = await UserModel.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    //set id, _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id // reference id of student

    //create a user transaction-2
    const newStudent = await StudentModel.create([payload, { session }])
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Operation failed')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
