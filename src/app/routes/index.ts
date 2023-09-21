import express from 'express';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { userRouter } from '../modules/user.ts/user.router';

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
];

moduleRoutes.forEach(route => router.use(route.path, route?.routes));

export default router;
