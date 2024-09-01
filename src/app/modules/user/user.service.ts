import config from '../../config'
import { TStudent } from '../student/student.interface'
import { TUser } from './user.interface'
import { UserModel } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_pass as string)
  userData.role = 'student'
  userData.id = '2030100001'
  const result = await UserModel.create(studentData)
  if (Object.keys(result).length) {
    studentData.id = result.id
    studentData.user = result._id
  }
  return result
}

export const UserServices = {
  createStudentIntoDB,
}
