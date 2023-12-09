"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseClassSchedulesRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const offeredCourseClassSchedules_controller_1 = require("./offeredCourseClassSchedules.controller");
const offeredCourseClassSchedules_validation_1 = require("./offeredCourseClassSchedules.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(offeredCourseClassSchedules_validation_1.OfferedCourseClassSchedulesValidation.createOfferedCourseClassSchedules), offeredCourseClassSchedules_controller_1.OfferedCourseClassSchedulesController.insertDB);
router.get('/', offeredCourseClassSchedules_controller_1.OfferedCourseClassSchedulesController.getAllDb);
router.get('/:id', offeredCourseClassSchedules_controller_1.OfferedCourseClassSchedulesController.getSingleDataById);
exports.offeredCourseClassSchedulesRoutes = router;
