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
exports.OfferedCourseClassSchedulesService = void 0;
const offeredCourseClassSchedules_utils_1 = require("./offeredCourseClassSchedules.utils");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const OfferedCourseClassSchedule_const_1 = require("./OfferedCourseClassSchedule.const");
const insertDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield offeredCourseClassSchedules_utils_1.OfferedCourseClassSchedulesUtils.checkRoomAvailable(data);
    yield offeredCourseClassSchedules_utils_1.OfferedCourseClassSchedulesUtils.checkFacultyAvailable(data);
    // const alreadyBookedRoomOnDay = await prisma.offeredCourseClassSchedule.findMany({
    //   where:{
    //     dayOfWeek:data?.dayOfWeek,
    //     room:{
    //       id:data?.roomId
    //     }
    //   }
    // })
    // console.log(alreadyBookedRoomOnDay,'aaaaaaaaaa');
    // const existingSlots = alreadyBookedRoomOnDay.map((schedules)=>({
    //   startTime:schedules.startTime,
    //   endTime:schedules.endTime,
    //   dayOfWeek:schedules.dayOfWeek
    // }))
    // console.log(existingSlots,"exiiiiiiiii");
    // const newSlot ={
    //   startTime :data?.startTime,
    //   endTime:data?.endTime,
    //   dayOfWeek:data?.dayOfWeek
    // }
    // console.log(newSlot,"newwwwwwwwwwww");
    // // for ( const  slot of existingSlots){
    // //   const existingStartTime = new Date(`1970-01-01T${slot.startTime}:00`)
    // //   const existingEndTime = new Date(`1970-01-01T${slot.endTime}:00`)
    // //   const newStartTime = new Date(`1970-01-01T${newSlot.startTime}:00`)
    // //   const newEndTime = new Date(`1970-01-01T${newSlot.endTime}:00`)
    // //   if(newStartTime  <= existingStartTime && newEndTime >= existingEndTime){
    // //     throw new ApiError(httpStatus.CONFLICT,"The Room already booked  ")
    // //     // console.log('the room booked');
    // //   }
    // // }
    // if(hasTimeConflict(existingSlots,newSlot)){
    //   throw new ApiError(httpStatus.CONFLICT,"The Room already booked  ")
    // }
    const result = yield prisma_1.default.offeredCourseClassSchedule.create({
        data,
        include: {
            faculty: true,
            offeredCourseSection: true,
            room: true,
            semesterRegistration: true,
        }
    });
    return result;
});
// !filter data 
// type IOfferedCourseClassScheduleFilterRequest = {
//   searchTerm?: string;
// };
const getAllDb = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    // !for pagination
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    //   console.log('page',page,'limit',limit,'skip',skip)
    //   ! for filters
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: OfferedCourseClassSchedule_const_1.OfferedCourseClassScheduleSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // if (Object.keys(filtersData).length > 0) {
    //   andConditions.push({
    //     AND: Object.keys(filtersData).map(key => ({
    //       [key]: {
    //         equals: (filtersData as any)[key],
    //       },
    //     })),
    //   });
    // }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map((key) => {
                if (OfferedCourseClassSchedule_const_1.offeredCourseClassScheduleRelationalFields.includes(key)) {
                    return {
                        [OfferedCourseClassSchedule_const_1.offeredCourseClassScheduleRelationalFieldsMapper[key]]: {
                            id: filtersData[key]
                        }
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filtersData[key]
                        }
                    };
                }
            })
        });
    }
    // for andCondition for where
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.offeredCourseClassSchedule.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        include: {
            faculty: true,
            offeredCourseSection: true,
            room: true,
            semesterRegistration: true,
        }
    });
    const total = yield prisma_1.default.academicSemester.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
// !get single data
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.offeredCourseClassSchedule.findUnique({
        where: {
            id,
        },
    });
    return result;
});
exports.OfferedCourseClassSchedulesService = { insertDB, getAllDb, getSingleData };
