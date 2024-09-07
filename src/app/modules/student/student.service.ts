import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { StudentModel } from './student.model'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'
import { UserModel } from '../user/user.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSearchableFields } from './students.constant'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // // {email: {$regex:query.searchTerm, $options:'i'}}
  // const queryObj = { ...query }

  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
  // let searchTerm = ''
  // if (searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }

  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludeFields.forEach((el) => delete queryObj[el])

  // console.log({ query }, { queryObj })

  // const filterQuery = searchQuery.find(query).populate('user')

  // let sort = '-createdAt'
  // if (query.sort) {
  //   sort = query.sort as string
  // }

  // const sortQuery = filterQuery.sort(sort)

  // let limit = 1
  // let skip = 0
  // if (query.limit) {
  //   limit = Number(query.limit)
  // }
  // let page = 1
  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }
  // const paginateQuery = sortQuery.skip(skip)

  // const limitQuery = paginateQuery.limit(limit)

  // //field limiting

  // let fields = '__v'
  // //fields:'name,email';
  // //fields:'name email';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  //   console.log({ fields })
  // }
  // const fieldQuery = await limitQuery.select(fields)

  // console.log(fieldQuery)
  // return fieldQuery

  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id).populate('user')
  // .populate('admissionSemester')

  return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  /*
    guardian: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'John'
    name.lastName = 'Doe'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }
  console.log(id, modifiedUpdatedData)

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
    }
  )
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const deleteStudent = await StudentModel.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )
    // console.log('This is student ', deleteStudent)
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }
    const deleteUser = await UserModel.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    )
    // console.log('This is user', deleteUser)
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
