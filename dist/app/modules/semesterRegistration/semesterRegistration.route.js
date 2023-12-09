"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const semesterRegistration_validation_1 = require("./semesterRegistration.validation");
const router = (0, express_1.Router)();
router.get('/', semesterRegistration_controller_1.SemesterRegistrationController.getAllFromDB);
// getting semester registration courses//
router.get('/get-my-semester-courses', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), semesterRegistration_controller_1.SemesterRegistrationController.getMySemesterRegistrationCourses);
router.get('/:id', semesterRegistration_controller_1.SemesterRegistrationController.getByIdFromDB);
router.post('/', (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.create), semesterRegistration_controller_1.SemesterRegistrationController.insertDB);
router.put('/:id', (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.update), semesterRegistration_controller_1.SemesterRegistrationController.updateOneToDB);
//! registration ///
router.post('/start-registration', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), semesterRegistration_controller_1.SemesterRegistrationController.startRegistration);
router.post('/enroll-into-course', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.enrollOrWithdrawCourse), semesterRegistration_controller_1.SemesterRegistrationController.enrollToCourse);
router.post('/withdraw-from-course', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), (0, validateRequest_1.default)(semesterRegistration_validation_1.SemesterRegistrationValidation.enrollOrWithdrawCourse), semesterRegistration_controller_1.SemesterRegistrationController.withdrawFromCourse);
router.post('/confirm-my-registration', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), 
// validateRequest(SemesterRegistrationValidation.enrollOrWithdrawCourse),
semesterRegistration_controller_1.SemesterRegistrationController.confirmMyRegistration);
router.post('/get-my-registration', (0, auth_1.default)(user_1.ENUM_USER_ROLE.STUDENT), 
// validateRequest(SemesterRegistrationValidation.enrollOrWithdrawCourse),
semesterRegistration_controller_1.SemesterRegistrationController.getMyRegistration);
router.post('/start-new-semester/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), semesterRegistration_controller_1.SemesterRegistrationController.startNewRegistration);
exports.semesterRegistrationRoutes = router;
