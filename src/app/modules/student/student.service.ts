import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find().populate('user')

  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id)
    .populate('user')
    .populate('admissionSemester')

  return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const result = await StudentModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
}
