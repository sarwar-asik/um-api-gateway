"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseSectionRoutes = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const offeredCourseSection_controller_1 = require("./offeredCourseSection.controller");
const offeredCourseSection_validation_1 = require("./offeredCourseSection.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(offeredCourseSection_validation_1.OfferedCourseSectionValidation.create), offeredCourseSection_controller_1.OfferedCourseSectionController.insertDB);
router.get('/', offeredCourseSection_controller_1.OfferedCourseSectionController.getAllDB);
exports.offeredCourseSectionRoutes = router;
