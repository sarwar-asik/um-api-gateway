import express from 'express';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { userRouter } from '../modules/user.ts/user.router';
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.router';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { authRoutes } from '../modules/auth/atuh.routes';
import { facultyRouter } from '../modules/faculty/faculty.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semester',
    routes: academicSemesterRoutes
  },
  {
    path: '/users',
    routes: userRouter
  },
  {
    path: '/academic-departments',
    routes: academicDepartmentRouter
  },
  {
    path: '/academic-faculties',
    routes: academicFacultyRoutes
  },
  {
    path: '/auth',
    routes: authRoutes
  },
  {
    path: '/faculties',
    routes: facultyRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route?.routes));

export default router;
