"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentEnrollCourseMarkRouter = void 0;
const express_1 = __importDefault(require("express"));
const studentEnrollCourseMark_controller_1 = require("./studentEnrollCourseMark.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY), studentEnrollCourseMark_controller_1.StudentEnrollCourseMarkController.getAllFromDB);
router.patch('/update-marks', studentEnrollCourseMark_controller_1.StudentEnrollCourseMarkController.updateStudentMarks);
router.patch('/final-marks', studentEnrollCourseMark_controller_1.StudentEnrollCourseMarkController.updateFinalMarks);
exports.studentEnrollCourseMarkRouter = router;
