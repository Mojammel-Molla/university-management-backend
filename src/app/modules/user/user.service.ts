import config from '../../config'
import { AcademicSemesterModel } from '../academic-semester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_pass as string)
  userData.role = 'student'
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester
  )
  userData.id = await generateStudentId(admissionSemester)

  const newUser = await UserModel.create(userData)

  if (Object.keys(newUser).length) {
    payload.id = newUser.id
    payload.user = newUser._id // reference id of student

    const newStudent = await StudentModel.create(payload)
    return newStudent
  }
  return newUser
}

export const UserServices = {
  createStudentIntoDB,
}
