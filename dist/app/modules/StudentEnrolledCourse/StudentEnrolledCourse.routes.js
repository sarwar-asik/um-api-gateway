"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentEnrolledCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const StudentEnrolledCourse_controller_1 = require("./StudentEnrolledCourse.controller");
const StudentEnrolledCourse_validation_1 = require("./StudentEnrolledCourse.validation");
const router = express_1.default.Router();
router.get('/', StudentEnrolledCourse_controller_1.StudentEnrolledCourseController.getAllFromDB);
router.get('/:id', StudentEnrolledCourse_controller_1.StudentEnrolledCourseController.getByIdFromDB);
router.post('/', (0, validateRequest_1.default)(StudentEnrolledCourse_validation_1.StudentEnrolledCourseValidation.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), StudentEnrolledCourse_controller_1.StudentEnrolledCourseController.insertIntoDB);
router.patch('/:id', (0, validateRequest_1.default)(StudentEnrolledCourse_validation_1.StudentEnrolledCourseValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), StudentEnrolledCourse_controller_1.StudentEnrolledCourseController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), StudentEnrolledCourse_controller_1.StudentEnrolledCourseController.deleteByIdFromDB);
exports.studentEnrolledCourseRoutes = router;
