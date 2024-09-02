import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import { AcademicSemesterValidations } from './academicSemester.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
)
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester
)

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
)

export const AcademicSemesterRoutes = router
