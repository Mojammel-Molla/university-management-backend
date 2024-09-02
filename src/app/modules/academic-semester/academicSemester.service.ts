import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  }

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code')
  }
  const result = await AcademicSemesterModel.create(payload)
  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find()
  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id)
  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  const result = await AcademicSemesterModel.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
