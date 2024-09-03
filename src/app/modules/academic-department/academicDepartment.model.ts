import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicSemesterDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicSemesterDepartmentSchema
)
