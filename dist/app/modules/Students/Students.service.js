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
exports.StudentsService = void 0;
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const Student_Utils_1 = require("./Student.Utils");
const insertDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.student.create({
        data,
    });
    return result;
});
const getAllDb = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    // !for pagination
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    //   console.log('page',page,'limit',limit,'skip',skip)
    //   ! for filters
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: ['firstName', 'email', 'contactNo', 'academicSemestarId'].map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    // for andCondition for where
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.student.findMany({
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
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.student.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateItoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    const result = yield prisma_1.default.student.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.student.delete({
        where: {
            id,
        },
        include: {
            academicDepartment: true,
            academicFaculty: true,
        },
    });
    return result;
});
const myCourses = (authId, filter) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(authId);
    // console.log(filter);
    if (!(filter === null || filter === void 0 ? void 0 : filter.academicSemesterId)) {
        const currentSemester = yield prisma_1.default.academicSemester.findFirst({
            where: {
                isCurrent: true,
            },
        });
        filter.academicSemesterId = currentSemester === null || currentSemester === void 0 ? void 0 : currentSemester.id;
        // console.log(currentSemester)
    }
    // console.log("...filter",{...filter});
    const result = yield prisma_1.default.studentEnrolledCourse.findMany({
        where: Object.assign({ student: {
                studentId: authId,
            } }, filter),
        include: {
            course: true,
        },
    });
    return result;
});
const getMyCourseSchedules = (authId, filter) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(authId,filter);
    if (!(filter === null || filter === void 0 ? void 0 : filter.academicSemesterId)) {
        const currentSemester = yield prisma_1.default.academicSemester.findFirst({
            where: {
                isCurrent: true,
            },
        });
        filter.academicSemesterId = currentSemester === null || currentSemester === void 0 ? void 0 : currentSemester.id;
        // console.log(currentSemester)
    }
    console.log(authId);
    const studentEnrolledCourses = yield myCourses(authId, filter);
    // console.log(studentEnrolledCourses);
    //  return studentEnrolledCourses
    const studentEnrolledCourseIds = studentEnrolledCourses === null || studentEnrolledCourses === void 0 ? void 0 : studentEnrolledCourses.map((item) => item.courseId);
    const result = yield prisma_1.default.studentSemesterRegistrationCourse.findMany({
        where: {
            student: {
                studentId: authId,
            },
            semesterRegistration: {
                academicSemester: {
                    id: filter.academicSemesterId,
                },
            },
            offeredCourse: {
                course: {
                    id: {
                        // ! !important in . here studentEnrolledCourseIds is a Array[]
                        in: studentEnrolledCourseIds,
                    },
                },
            },
        },
        include: {
            offeredCourse: {
                include: {
                    course: true,
                },
            },
            offeredCourseSection: {
                include: {
                    offeredCourseClassSchedule: {
                        include: {
                            room: {
                                include: {
                                    building: true,
                                },
                            },
                            faculty: true,
                        },
                    },
                },
            },
        },
    });
    return result;
});
const getMyAcademicInfo = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(authUserId, 'authUserid');
    const academicInfo = yield prisma_1.default.studentAcademicInfo.findFirst({
        where: {
            student: {
                studentId: authUserId,
            },
        },
    });
    // console.log(academicInfo);
    const enrolledCourses = yield prisma_1.default.studentEnrolledCourse.findMany({
        where: {
            student: {
                studentId: authUserId,
            },
            status: client_1.StudentEnrolledCourseStatus.COMPLETED,
        },
        include: {
            course: true,
            academicSemester: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    // came from studentUtils
    const groupByAcademicSemesterData = Student_Utils_1.StudentUtils.groupByAcademicSemester(enrolledCourses);
    return { academicInfo, course: groupByAcademicSemesterData };
});
const CreateStudentFromEvent = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const studentData = {
        studentId: e.id,
        firstName: e.name.firstName,
        lastName: e.name.lastName,
        middleName: e.name.middleName,
        email: e.email,
        contactNo: e.contactNo,
        gender: e.gender,
        bloodGroup: e.bloodGroup,
        academicSemesterId: e.academicSemester.syncId,
        academicDepartmentId: e.academicDepartment.syncId,
        academicFacultyId: e.academicFaculty.syncId
    };
    yield insertDB(studentData);
});
exports.StudentsService = {
    insertDB,
    getAllDb,
    getSingleData,
    updateItoDb,
    deleteFromDb,
    myCourses,
    getMyCourseSchedules,
    getMyAcademicInfo,
    CreateStudentFromEvent
};
