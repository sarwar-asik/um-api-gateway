import express from 'express';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { userRouter } from '../modules/user.ts/user.router';
import { studentSemesterPaymentRoutes } from '../modules/studentSemesterPayment/studentSemesterPayment.routes';
import { studentEnrolledCourseMarkRoutes } from '../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.routes';
import { studentEnrolledCourseRoutes } from '../modules/studentEnrolledCourse/studentEnrolledCourse.routes';
import { offeredCourseClassScheduleRoutes } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.routes';
import { offeredCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.routes';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.routes';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.routes';
import { courseRoutes } from '../modules/course/course.routes';
import { roomRoutes } from '../modules/room/room.routes';
import { buildingRoutes } from '../modules/building/building.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    routes: userRouter
},
{
    path: '/academic-faculties',
    routes: academicFacultyRoutes
},
{
    path: '/academic-departments',
    routes: academicDepartmentRoutes
},
{
    path: '/academic-semesters',
    routes: academicSemesterRoutes
},
{
    path: '/buildings',
    routes: buildingRoutes
},
{
    path: '/rooms',
    routes: roomRoutes
},
{
    path: '/courses',
    routes: courseRoutes
},
{
    path: '/semester-registrations',
    routes: semesterRegistrationRoutes
},
{
    path: '/offered-courses',
    routes: offeredCourseRoutes
},
{
    path: '/offered-course-sections',
    routes: offeredCourseSectionRoutes
},
{
    path: '/offered-course-class-schedules',
    routes: offeredCourseClassScheduleRoutes
},
{
    path: '/student-enrolled-courses',
    routes: studentEnrolledCourseRoutes
},
{
    path: '/student-enrolled-course-marks',
    routes: studentEnrolledCourseMarkRoutes
},
{
    path: '/student-semester-payments',
    routes: studentSemesterPaymentRoutes
}
];

moduleRoutes.forEach(route => router.use(route.path, route?.routes));

export default router;
