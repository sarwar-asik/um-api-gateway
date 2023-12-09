"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academic_validation_1 = require("./academic.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(academic_validation_1.AcademicSemesterValidation.createAcademicSemester), academicSemester_controller_1.AcademicSemesterController.insertDB);
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllDb);
router.get('/:id', academicSemester_controller_1.AcademicSemesterController.getSingleDataById);
router.patch('/:id', (0, validateRequest_1.default)(academic_validation_1.AcademicSemesterValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), academicSemester_controller_1.AcademicSemesterController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), academicSemester_controller_1.AcademicSemesterController.deleteByIdFromDB);
exports.academicRouter = router;
