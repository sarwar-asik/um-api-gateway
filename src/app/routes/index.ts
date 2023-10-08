import express from 'express';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';

import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.router';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { authRoutes } from '../modules/auth/atuh.routes';
import { facultyRouter } from '../modules/faculty/faculty.routes';
import { userRoutes } from '../modules/user/user.routes';
import { managementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semesters',
    routes: academicSemesterRoutes
  },
  {
    path: '/users',
    routes: userRoutes
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
  {
    path: '/management-departments',
    routes: managementDepartmentRoutes
  },
  
];

moduleRoutes.forEach(route => router.use(route.path, route?.routes));

export default router;
