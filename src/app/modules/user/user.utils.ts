import { TAcademicSemester } from '../academic-semester/academicSemester.interface'
import { UserModel } from './user.model'

const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const generateStudentId = async (
  payload: TAcademicSemester
): Promise<string> => {
  let currentId = '0000'
  const lastStudentId = await findLastStudentId()

  if (lastStudentId) {
    const lastStudentYear = lastStudentId.substring(0, 4)
    const lastStudentSemesterCode = lastStudentId.substring(4, 6)
    const currentStudentYear = payload.year
    const currentSemesterCode = payload.code

    if (
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentYear === currentStudentYear
    ) {
      currentId = lastStudentId.substring(6)
    }
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  return `${payload.year}${payload.code}${incrementId}`
}
