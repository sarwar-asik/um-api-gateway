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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseSectionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../courses/utils");
const offeredCourseClassSchedules_utils_1 = require("../offeredCourseClassSchedules/offeredCourseClassSchedules.utils");
const insertDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { classSchedules } = payload, data = __rest(payload, ["classSchedules"]);
    // console.log(data,"data",classSchedules);
    const isExistsOfferedCourse = yield prisma_1.default.offeredCourse.findFirst({
        where: {
            id: data === null || data === void 0 ? void 0 : data.offeredCourseId,
        },
    });
    if (!isExistsOfferedCourse) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'offeredCourseId is not exist');
    }
    // data.semesterRegistrationId = isExistsOfferedCourse.semesterRegistrationId;
    // check exist //
    const offerCourseExist = yield prisma_1.default.offeredCourseSection.findFirst({
        where: {
            offeredCourse: {
                id: data === null || data === void 0 ? void 0 : data.offeredCourseId,
            },
            title: data === null || data === void 0 ? void 0 : data.title,
        },
    });
    if (offerCourseExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'offeredCourseSection already exits ');
    }
    yield (0, utils_1.asyncForEach)(classSchedules, (schedule) => __awaiter(void 0, void 0, void 0, function* () {
        yield offeredCourseClassSchedules_utils_1.OfferedCourseClassSchedulesUtils.checkRoomAvailable(schedule);
        yield offeredCourseClassSchedules_utils_1.OfferedCourseClassSchedulesUtils.checkFacultyAvailable(schedule);
    }));
    const createSection = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createOfferedCourseSection = yield transactionClient.offeredCourseSection.create({
            data: {
                title: data === null || data === void 0 ? void 0 : data.title,
                maxCapacity: data === null || data === void 0 ? void 0 : data.maxCapacity,
                offeredCourseId: data === null || data === void 0 ? void 0 : data.offeredCourseId,
                semesterRegistrationId: isExistsOfferedCourse === null || isExistsOfferedCourse === void 0 ? void 0 : isExistsOfferedCourse.semesterRegistrationId
            }
        });
        const scheduleData = classSchedules.map((schedule) => ({
            startTime: schedule === null || schedule === void 0 ? void 0 : schedule.startTime,
            endTime: schedule === null || schedule === void 0 ? void 0 : schedule.endTime,
            dayOfWeek: schedule === null || schedule === void 0 ? void 0 : schedule.dayOfWeek,
            roomId: schedule === null || schedule === void 0 ? void 0 : schedule.roomId,
            facultyId: schedule === null || schedule === void 0 ? void 0 : schedule.facultyId,
            offeredCourseSectionId: createOfferedCourseSection === null || createOfferedCourseSection === void 0 ? void 0 : createOfferedCourseSection.id,
            semesterRegistrationId: isExistsOfferedCourse === null || isExistsOfferedCourse === void 0 ? void 0 : isExistsOfferedCourse.semesterRegistrationId,
        }));
        // console.log(scheduleData,"scheduleData");
        // const createSchedules =
        yield transactionClient.offeredCourseClassSchedule.createMany({
            data: scheduleData,
        });
        // console.log(createSchedules, 'createSchedules');
        return createOfferedCourseSection;
    }));
    const result = yield prisma_1.default.offeredCourseSection.findFirst({
        where: {
            id: createSection === null || createSection === void 0 ? void 0 : createSection.id
        },
        include: {
            offeredCourse: {
                include: {
                    course: true
                }
            },
            offeredCourseClassSchedule: {
                include: {
                    room: {
                        include: {
                            building: true
                        }
                    },
                    faculty: true
                }
            }
        }
    });
    return result;
});
const getAllDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.offeredCourseSection.findMany({});
    return data;
});
exports.OfferedCourseSectionService = { insertDB, getAllDb };
