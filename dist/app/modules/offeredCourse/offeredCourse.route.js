"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const offeredCourse_validation_1 = require("./offeredCourse.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(offeredCourse_validation_1.OfferedCourseValidation.createOfferedCourse), offeredCourse_controller_1.OfferedCourseController.insertDB);
// 
router.get('/', offeredCourse_controller_1.OfferedCourseController.getAllDb);
router.get('/:id', offeredCourse_controller_1.OfferedCourseController.getSingleDataById);
exports.offeredCourseRoutes = router;
