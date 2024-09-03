import { model, Schema } from 'mongoose'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    // required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First Name cannot be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    // required: [true, 'Last name is required'],
    trim: true,
    maxlength: [20, 'Last Name cannot be more than 20 characters'],
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    // required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    // required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    // required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    // required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    // required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    // required: [true, 'Mother Contact No is required'],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
})

const createStudentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, 'Id is require'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is require'],
    unique: true,
    ref: 'user',
  },
  name: {
    type: userNameSchema,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid gender',
    },
    required: [true, 'Student gender is required'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'admissionSemester',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export const StudentModel = model<TStudent>('student', createStudentSchema)
