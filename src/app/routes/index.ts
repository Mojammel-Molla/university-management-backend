import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { StudentRoutes } from '../modules/student/student.route'
import { AcademicSemesterRoutes } from '../modules/academic-semester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academic-department/academicDepartment.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))
export default router
