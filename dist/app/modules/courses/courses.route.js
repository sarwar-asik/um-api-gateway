"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const courses_controller_1 = require("./courses.controller");
const courses_validation_1 = require("./courses.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(courses_validation_1.CoursesValidation.createCourses), courses_controller_1.CoursesController.insertDB);
router.get('/', courses_controller_1.CoursesController.getAllDb);
router.get('/:id', courses_controller_1.CoursesController.getSingleDataById);
router.patch('/:id', courses_controller_1.CoursesController.updateIntoDb);
router.delete('/:id', courses_controller_1.CoursesController.deleteFromDb);
router.post("/:id/assign-faculties", (0, validateRequest_1.default)(courses_validation_1.CoursesValidation.assignOrRemoveFaculties), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.SUPER_ADMIN), courses_controller_1.CoursesController.assignFaculties);
router.delete("/:id/remove-faculties", (0, validateRequest_1.default)(courses_validation_1.CoursesValidation.assignOrRemoveFaculties), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.SUPER_ADMIN), courses_controller_1.CoursesController.removeFaculties);
exports.coursesRoutes = router;
