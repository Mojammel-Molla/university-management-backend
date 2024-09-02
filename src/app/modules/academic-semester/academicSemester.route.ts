import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  AcademicSemesterControllers.createAcademicSemester
)

export const AcademicSemesterRoutes = router
