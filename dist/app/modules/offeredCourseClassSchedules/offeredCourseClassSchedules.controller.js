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
exports.OfferedCourseClassSchedulesController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const offeredCourseClassSchedules_service_1 = require("./offeredCourseClassSchedules.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const OfferedCourseClassSchedule_const_1 = require("./OfferedCourseClassSchedule.const");
const insertDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    // console.log(data,"oooooooo");
    const result = yield offeredCourseClassSchedules_service_1.OfferedCourseClassSchedulesService.insertDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Successfully OfferedCourseClassSchedules',
        data: result,
    });
}));
// ! filter data 
const getAllDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const offeredCourseClassScheduleFilterableFields = [
    //     'searchTerm',
    //     'dayOfWeek',
    //     'offeredCourseSectionId',
    //     'semesterRegistrationId',
    //     'roomId',
    //     'facultyId'
    // ]
    const filters = (0, pick_1.default)(req.query, OfferedCourseClassSchedule_const_1.offeredCourseClassScheduleFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield offeredCourseClassSchedules_service_1.OfferedCourseClassSchedulesService.getAllDb(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully get OfferedCourseClassSchedules Data',
        meta: result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const getSingleDataById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield offeredCourseClassSchedules_service_1.OfferedCourseClassSchedulesService.getSingleData(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Successfully get ${id}`,
        data: result,
    });
}));
exports.OfferedCourseClassSchedulesController = { insertDB, getAllDb, getSingleDataById };
