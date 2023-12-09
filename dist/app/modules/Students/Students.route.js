"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Students_controller_1 = require("./Students.controller");
const Students_validation_1 = require("./Students.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = (0, express_1.Router)();
router.post('/', 
// auth(ENUM_USER_ROLE.ADMIN),
(0, validateRequest_1.default)(Students_validation_1.StudentsValidation.createStudents), Students_controller_1.StudentController.insertDB);
router.get('/', Students_controller_1.StudentController.getAllDb);
router.get('/my-courses', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), Students_controller_1.StudentController.myCourses);
router.get('/my-academic-info', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), Students_controller_1.StudentController.getMyAcademicInfo);
// getMyCourseSchedules
router.get('/my-course-schedules', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), Students_controller_1.StudentController.getMyCoursesSchedules);
router.put('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(Students_validation_1.StudentsValidation.updateStudents), Students_controller_1.StudentController.updateIntoDb);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Students_controller_1.StudentController.deleteFromDb);
exports.studentsRoutes = router;
