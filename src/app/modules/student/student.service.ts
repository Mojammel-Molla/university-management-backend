import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { StudentModel } from './student.model'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'
import { UserModel } from '../user/user.model'

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find().populate('user')

  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id).populate('user')
  // .populate('admissionSemester')

  return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const result = await StudentModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteStudentFromDB = async (_id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deleteStudent = await StudentModel.findByIdAndUpdate(
      { _id },
      { isDeleted: true },
      { new: true, session }
    )
    console.log('This is student ', deleteStudent)
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }
    const deleteUser = await UserModel.findByIdAndUpdate(
      { _id },
      { isDeleted: true },
      { new: true, session }
    )
    console.log('This is user', deleteUser)
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }
    await session.commitTransaction()
    return deleteStudent
  } catch (err) {
    await session.abortTransaction()
    console.error('error details', err)
    throw new AppError(httpStatus.BAD_REQUEST, 'Operation failed')
  } finally {
    session.endSession()
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
}
