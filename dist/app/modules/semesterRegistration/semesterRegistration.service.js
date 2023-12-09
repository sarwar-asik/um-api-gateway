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
exports.SemesterRegistrationService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../courses/utils");
const studentEnrollCourseMark_service_1 = require("../studentEnrollCourseMark/studentEnrollCourseMark.service");
const semesterRegistration_service_1 = require("../studentSemesterPayment/semesterRegistration.service");
const studentSemesterRegistrationCourse_services_1 = require("../studentSemesterRegistrationCourse/studentSemesterRegistrationCourse.services");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistration_utils_1 = require("./semesterRegistration.utils");
const insertDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isAnySemesterRegistrationUpcoming = yield prisma_1.default.semesterRegistration.findFirst({
        where: {
            OR: [
                {
                    status: client_1.SemesterRegistrationStatus.UPCOMING,
                },
                {
                    status: client_1.SemesterRegistrationStatus.ONGOING,
                },
            ],
        },
    });
    if (isAnySemesterRegistrationUpcoming) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `There is already an ${isAnySemesterRegistrationUpcoming === null || isAnySemesterRegistrationUpcoming === void 0 ? void 0 : isAnySemesterRegistrationUpcoming.status} registration `);
    }
    const result = yield prisma_1.default.semesterRegistration.create({
        data,
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: semesterRegistration_constant_1.semesterRegistrationSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (semesterRegistration_constant_1.semesterRegistrationRelationalFields.includes(key)) {
                    return {
                        [semesterRegistration_constant_1.semesterRegistrationRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.semesterRegistration.findMany({
        include: {
            academicSemester: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.semesterRegistration.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.semesterRegistration.findUnique({
        where: {
            id,
        },
        include: {
            academicSemester: true,
        },
    });
    return result;
});
const updateOneToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.semesterRegistration.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Data not found');
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.status) &&
        (isExist === null || isExist === void 0 ? void 0 : isExist.status) === client_1.SemesterRegistrationStatus.UPCOMING &&
        payload.status !== client_1.SemesterRegistrationStatus.ONGOING) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Can only move from UPCOMING to ONGOING');
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.status) &&
        (isExist === null || isExist === void 0 ? void 0 : isExist.status) === client_1.SemesterRegistrationStatus.ONGOING &&
        payload.status !== client_1.SemesterRegistrationStatus.ENDED) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Can only move from ONGOING to ENDED');
    }
    const result = yield prisma_1.default.semesterRegistration.update({
        where: {
            id,
        },
        data: payload,
        include: {
            academicSemester: true,
        },
    });
    return result;
});
//! start Regestration >>>
const startMyRegistration = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(authUserId, 'autUserId');
    const studentInfo = yield prisma_1.default.student.findFirst({
        where: {
            studentId: authUserId,
        },
    });
    console.log(studentInfo, 'studentInfo');
    if (!studentInfo) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not Found the Student');
    }
    const semesterRegistrationInfo = yield prisma_1.default.semesterRegistration.findFirst({
        where: {
            status: {
                in: [
                    client_1.SemesterRegistrationStatus.ONGOING,
                    client_1.SemesterRegistrationStatus.UPCOMING,
                ],
            },
        },
    });
    if ((semesterRegistrationInfo === null || semesterRegistrationInfo === void 0 ? void 0 : semesterRegistrationInfo.status) === client_1.SemesterRegistrationStatus.UPCOMING) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Registration is not started yet');
    }
    let studentRegistration = yield prisma_1.default.studentSemesterRegistration.findFirst({
        where: {
            student: {
                id: studentInfo === null || studentInfo === void 0 ? void 0 : studentInfo.id,
            },
            semesterRegistration: {
                id: semesterRegistrationInfo === null || semesterRegistrationInfo === void 0 ? void 0 : semesterRegistrationInfo.id,
            },
        },
    });
    if (!studentRegistration) {
        studentRegistration = yield prisma_1.default.studentSemesterRegistration.create({
            data: {
                student: {
                    connect: {
                        id: studentInfo === null || studentInfo === void 0 ? void 0 : studentInfo.id,
                    },
                },
                semesterRegistration: {
                    connect: {
                        id: semesterRegistrationInfo === null || semesterRegistrationInfo === void 0 ? void 0 : semesterRegistrationInfo.id,
                    },
                },
            },
        });
        // console.log(studentRegistration,"console.log(studentRegistration);");
    }
    return {
        semesterRegistration: semesterRegistrationInfo,
        studentSemesterRegistration: studentRegistration,
    };
});
// ! for enrollment ///
const enrollIntoCourse = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return studentSemesterRegistrationCourse_services_1.studentSemesterRegistrationCourseService.enrollIntoCourse(authUserId, payload);
});
// ! for withdraw ////
const withdrawFromCourse = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return studentSemesterRegistrationCourse_services_1.studentSemesterRegistrationCourseService.withdrawFromCourse(authUserId, payload);
});
const confirmMyRegistration = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🚀 ~ file: semesterRegistration.service.ts:299 ~ authUserId:', authUserId);
    const semesterRegistration = yield prisma_1.default.semesterRegistration.findFirst({
        where: {
            status: client_1.SemesterRegistrationStatus.ONGOING,
        },
    });
    // console.log(authUserId,"semesterRegistration.id",semesterRegistration?.id,);
    const studentSemesterRegistration = yield prisma_1.default.studentSemesterRegistration.findFirst({
        where: {
            semesterRegistration: {
                id: semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.id,
            },
            student: {
                studentId: authUserId,
            },
        },
    });
    // console.log(studentSemesterRegistration,"");
    if (!studentSemesterRegistration) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You were not registration yet');
    }
    if (studentSemesterRegistration.totalCreditsTaken === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `You are not enroll to any course`);
    }
    if (studentSemesterRegistration.totalCreditsTaken &&
        (semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.minCredit) &&
        (semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCredit) &&
        (studentSemesterRegistration.totalCreditsTaken <
            (semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.minCredit) ||
            studentSemesterRegistration.totalCreditsTaken >
                (semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCredit))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `You can take only ${semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.minCredit} to ${semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.maxCredit}`);
    }
    yield prisma_1.default.studentSemesterRegistration.update({
        where: {
            id: studentSemesterRegistration.id,
        },
        data: {
            isConfirmed: true,
        },
    });
    // console.log(studentSemesterRegistration,authUserId,semesterRegistration);
    return { message: 'Your registration is confirmed' };
});
const getMyRegistration = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistration = yield prisma_1.default.semesterRegistration.findFirst({
        where: {
            status: client_1.SemesterRegistrationStatus.ONGOING,
        },
        include: {
            academicSemester: true,
        },
    });
    const studentSemesterRegistration = yield prisma_1.default.studentSemesterRegistration.findFirst({
        where: {
            semesterRegistration: {
                id: semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.id,
            },
            student: {
                studentId: authUserId,
            },
        },
        include: {
            student: true,
        },
    });
    return { semesterRegistration, studentSemesterRegistration };
});
// start new semester /
const startNewSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id,"started new semester registration");
    const semesterRegistration = yield prisma_1.default.semesterRegistration.findFirst({
        where: {
            id,
        },
        include: {
            academicSemester: true,
        },
    });
    if (!semesterRegistration) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Semester Registration not found');
    }
    if (semesterRegistration.status !== client_1.SemesterRegistrationStatus.ENDED) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Semester Registration is not ENDED yet');
    }
    // console.log(semesterRegistration,"semesterRegistration");
    if (semesterRegistration.academicSemester.isCurrent) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Semester Registration is already started');
    }
    yield prisma_1.default.$transaction((prismaTransactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaTransactionClient.academicSemester.updateMany({
            where: {
                isCurrent: true,
            },
            data: {
                isCurrent: false,
            },
        });
        yield prismaTransactionClient.academicSemester.update({
            where: {
                id: semesterRegistration.academicSemester.id,
            },
            data: {
                isCurrent: true,
            },
        });
        // find enrolled student ///
        const studentSemesterRegistrationCheck = yield prisma_1.default.studentSemesterRegistration.findMany({
            where: {
                semesterRegistration: {
                    id,
                },
                isConfirmed: true,
            },
        });
        // console.log(studentSemesterRegistrationCheck);
        (0, utils_1.asyncForEach)(studentSemesterRegistrationCheck, (studentSemReg) => __awaiter(void 0, void 0, void 0, function* () {
            //! student payment
            if (studentSemReg === null || studentSemReg === void 0 ? void 0 : studentSemReg.totalCreditsTaken) {
                const totalPaymentAmount = studentSemReg.totalCreditsTaken * 5000;
                yield semesterRegistration_service_1.StudentSemesterPaymentService.createSemesterPayment(prismaTransactionClient, {
                    studentId: studentSemReg === null || studentSemReg === void 0 ? void 0 : studentSemReg.studentId,
                    academicSemesterId: semesterRegistration.academicSemesterId,
                    totalPaymentAmount,
                });
            }
            //  console.log(studentSemReg);
            const studentSemesterRegistrationCourse = yield prismaTransactionClient.studentSemesterRegistrationCourse.findMany({
                where: {
                    semesterRegistration: {
                        id,
                    },
                    student: {
                        id: studentSemReg === null || studentSemReg === void 0 ? void 0 : studentSemReg.studentId,
                    },
                },
                include: {
                    offeredCourse: {
                        include: {
                            course: true,
                        },
                    },
                },
            });
            // console.log(studentSemesterRegistrationCourse);
            (0, utils_1.asyncForEach)(studentSemesterRegistrationCourse, (item) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                // console.log(item);
                const isExistData = yield prismaTransactionClient.studentEnrolledCourse.findFirst({
                    where: {
                        studentId: item.studentId,
                        courseId: (_a = item === null || item === void 0 ? void 0 : item.offeredCourse) === null || _a === void 0 ? void 0 : _a.courseId,
                        academicSemesterId: semesterRegistration.academicSemesterId,
                    },
                });
                if (!isExistData) {
                    const enrolledCourseData = {
                        studentId: item.studentId,
                        courseId: (_b = item === null || item === void 0 ? void 0 : item.offeredCourse) === null || _b === void 0 ? void 0 : _b.courseId,
                        academicSemesterId: semesterRegistration.academicSemesterId,
                    };
                    const studentEnrolledCourseData = yield prismaTransactionClient.studentEnrolledCourse.create({
                        data: enrolledCourseData,
                    });
                    yield studentEnrollCourseMark_service_1.StudentEnrollCourseMarkService.createStudentEnrollCourseDefaultMarks(prismaTransactionClient, {
                        studentId: item === null || item === void 0 ? void 0 : item.studentId,
                        studentEnrolledCourseId: studentEnrolledCourseData === null || studentEnrolledCourseData === void 0 ? void 0 : studentEnrolledCourseData.id,
                        academicSemesterId: semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.academicSemesterId,
                    });
                }
            }));
        }));
    }));
    return {
        message: 'Semester Started successfully',
    };
});
const getMySemesterRegistrationCourses = (authUserId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('fromService authUser', authUserId);
    const student = yield prisma_1.default.student.findFirst({
        where: {
            studentId: authUserId,
        },
    });
    const semesterRegistration = yield prisma_1.default.semesterRegistration.findFirst({
        where: {
            status: {
                in: [
                    client_1.SemesterRegistrationStatus.UPCOMING,
                    client_1.SemesterRegistrationStatus.ONGOING,
                ],
            },
        },
        include: {
            academicSemester: true,
        },
    });
    if (!semesterRegistration) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not found semester registration');
    }
    const studentCompleteCourse = yield prisma_1.default.studentEnrolledCourse.findMany({
        where: {
            status: client_1.StudentEnrolledCourseStatus.COMPLETED,
            student: {
                id: student === null || student === void 0 ? void 0 : student.id,
            },
        },
        include: {
            course: true,
        },
    });
    const studentCurrentSemesterTakenCourse = yield prisma_1.default.studentSemesterRegistrationCourse.findMany({
        where: {
            student: {
                id: student === null || student === void 0 ? void 0 : student.id,
            },
            semesterRegistration: {
                id: semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.id,
            },
        },
        include: {
            offeredCourse: true,
            offeredCourseSection: true,
        },
    });
    const offeredCourse = yield prisma_1.default.offeredCourse.findMany({
        where: {
            semesterRegistration: {
                id: semesterRegistration.id,
            },
            academicDepartment: {
                id: student === null || student === void 0 ? void 0 : student.academicDepartmentId,
            },
        },
        include: {
            course: {
                include: {
                    prerequisite: {
                        include: {
                            prerequisite: true,
                        },
                    },
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
                        },
                    },
                },
            },
        },
    });
    const availableCourses = semesterRegistration_utils_1.SemesterRegistrationUtils.getAvailableCourses(offeredCourse, studentCompleteCourse, studentCurrentSemesterTakenCourse);
    // console.log(availableCourses,"available courses");
    return availableCourses;
});
exports.SemesterRegistrationService = {
    insertDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneToDB,
    startMyRegistration,
    enrollIntoCourse,
    withdrawFromCourse,
    confirmMyRegistration,
    getMyRegistration,
    startNewSemester,
    getMySemesterRegistrationCourses,
};
