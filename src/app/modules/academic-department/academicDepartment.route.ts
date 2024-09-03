import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentControllers } from './academicDepartment.controller'
import { AcademicDepartmentValidations } from './academicDepartment.validation'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
)
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments)

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment
)

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartment
)

export const AcademicDepartmentRoutes = router
