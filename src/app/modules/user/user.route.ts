import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from '../student/student.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createUser
)

export const UserRoutes = router
