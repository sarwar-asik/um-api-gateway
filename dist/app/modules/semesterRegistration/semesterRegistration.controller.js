"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistration_service_1 = require("./semesterRegistration.service");
const insertDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.insertDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Successfully SemesterRegistration',
        data: result,
    });
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, semesterRegistration_constant_1.semesterRegistrationFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.getAllFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SemesterRegistrations fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.getByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SemesterRegistration fetched successfully',
        data: result,
    });
}));
const updateOneToDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req === null || req === void 0 ? void 0 : req.body;
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.updateOneToDB(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SemesterRegistration updated successfully',
        data: result,
    });
}));
const startRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user, 'uuuuuuuuuuu');
    // console.log(req.headers.authorization,"aaaaaaaaa");
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.startMyRegistration(user === null || user === void 0 ? void 0 : user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Semester Registration  successfully',
        data: result,
    });
}));
const enrollToCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user);
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.enrollIntoCourse(user === null || user === void 0 ? void 0 : user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'enrollment successfully',
        data: result,
    });
}));
const withdrawFromCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user);
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.withdrawFromCourse(user === null || user === void 0 ? void 0 : user.userId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'withdraw from course successfully',
        data: result,
    });
}));
const confirmMyRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user);
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.confirmMyRegistration(user === null || user === void 0 ? void 0 : user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'confirmed registration successfully',
        data: result,
    });
}));
const getMyRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user);
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.getMyRegistration(user === null || user === void 0 ? void 0 : user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get my registration successfully',
        data: result,
    });
}));
const startNewRegistration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(user);
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.startNewSemester(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'start New semester registration successfully',
        data: result,
    });
}));
const getMySemesterRegistrationCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // console.log(user);
    const result = yield semesterRegistration_service_1.SemesterRegistrationService.getMySemesterRegistrationCourses(user === null || user === void 0 ? void 0 : user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'get my registration courses successfully',
        data: result,
    });
}));
exports.SemesterRegistrationController = {
    insertDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneToDB,
    startRegistration,
    enrollToCourse,
    withdrawFromCourse,
    confirmMyRegistration,
    getMyRegistration,
    startNewRegistration,
    getMySemesterRegistrationCourses
};
