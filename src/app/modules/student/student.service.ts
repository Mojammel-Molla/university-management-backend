import { StudentModel } from './student.model'

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
}
