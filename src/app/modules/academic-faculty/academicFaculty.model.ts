import { model, Schema } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

const academicSemesterFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const AcademicFacultyModel = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicSemesterFacultySchema
)
