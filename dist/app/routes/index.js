"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StudentEnrolledCourse_routes_1 = require("../modules/StudentEnrolledCourse/StudentEnrolledCourse.routes");
const Students_route_1 = require("../modules/Students/Students.route");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicSemester_router_1 = require("../modules/academicSemester/academicSemester.router");
const buildings_route_1 = require("../modules/buildings/buildings.route");
const courses_route_1 = require("../modules/courses/courses.route");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const offeredCourse_route_1 = require("../modules/offeredCourse/offeredCourse.route");
const offeredCourseClassSchedules_route_1 = require("../modules/offeredCourseClassSchedules/offeredCourseClassSchedules.route");
const offeredCourseSection_route_1 = require("../modules/offeredCourseSection/offeredCourseSection.route");
const rooms_route_1 = require("../modules/rooms/rooms.route");
const semesterRegistration_route_1 = require("../modules/semesterRegistration/semesterRegistration.route");
const StudentEnrollCourseMark_routes_1 = require("../modules/studentEnrollCourseMark/StudentEnrollCourseMark.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/academic-semesters',
        routes: academicSemester_router_1.academicRouter,
    },
    {
        path: '/students',
        routes: Students_route_1.studentsRoutes,
    },
    {
        path: '/academic-faculties',
        routes: academicFaculty_routes_1.academicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        routes: academicDepartment_routes_1.academicDepartmentRoutes,
    },
    {
        path: '/buildings',
        routes: buildings_route_1.buildingsRoutes,
    },
    {
        path: '/rooms',
        routes: rooms_route_1.roomsRoutes,
    },
    {
        path: '/courses',
        routes: courses_route_1.coursesRoutes,
    },
    {
        path: '/faculties',
        routes: faculty_routes_1.facultyRoutes,
    },
    {
        path: '/semester-registrations',
        // /semester-registrations
        routes: semesterRegistration_route_1.semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        routes: offeredCourse_route_1.offeredCourseRoutes,
    },
    {
        path: '/offered-course-sections',
        routes: offeredCourseSection_route_1.offeredCourseSectionRoutes,
    },
    {
        path: '/offered-course-class-schedules',
        routes: offeredCourseClassSchedules_route_1.offeredCourseClassSchedulesRoutes,
    },
    {
        path: '/student-enrolled-courses',
        routes: StudentEnrolledCourse_routes_1.studentEnrolledCourseRoutes,
    },
    {
        path: '/student-enroll-course-marks',
        routes: StudentEnrollCourseMark_routes_1.studentEnrollCourseMarkRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route === null || route === void 0 ? void 0 : route.routes));
exports.default = router;
