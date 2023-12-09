"use strict";
// ! for enrollment ///
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
exports.studentSemesterRegistrationCourseService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const enrollIntoCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  console.log(id,payload,"from enroll");
    const student = yield prisma_1.default.student.findFirst({
        where: {
            studentId: id,
        },
    });
    if (!student) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    //  console.log(student);
    const semesterRegistration = yield prisma_1.default.semesterRegistration.findFirst({
        where: {
            status: client_1.SemesterRegistrationStatus.ONGOING,
        },
    });
    if (!semesterRegistration) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'semesterRegistration not found');
    }
    const offeredCourse = yield prisma_1.default.offeredCourse.findFirst({
        where: {
            id: payload === null || payload === void 0 ? void 0 : payload.offeredCourseId,
        },
        include: {
            course: true,
        },
    });
    if (!offeredCourse) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'offered course not found');
    }
    const offeredCourseSection = yield prisma_1.default.offeredCourseSection.findFirst({
        where: {
            id: payload === null || payload === void 0 ? void 0 : payload.offeredCourseSectionId,
        },
    });
    if (!offeredCourseSection) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'offered course  sectionnot found');
    }
    // console.log(semesterRegistration);
    // console.log(semesterRegistration?.id);
    if (offeredCourseSection.maxCapacity &&
        offeredCourseSection.currentlyEnrolledStudent &&
        offeredCourseSection.currentlyEnrolledStudent >=
            offeredCourseSection.maxCapacity) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'student capacity is full');
    }
    // console.log( {
    //   studentId:student?.id,
    //   semesterRegistrationId:semesterRegistration?.id,
    //   offeredCourseId:payload.offeredCourseId,
    //   offeredCourseSectionId:payload?.offeredCourseSectionId
    // },"studentSemesterRegistrationCourse");
    // ! with transaction
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.studentSemesterRegistrationCourse.create({
            data: {
                studentId: student === null || student === void 0 ? void 0 : student.id,
                semesterRegistrationId: semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.id,
                offeredCourseId: payload.offeredCourseId,
                offeredCourseSectionId: payload === null || payload === void 0 ? void 0 : payload.offeredCourseSectionId,
            },
        });
        yield transactionClient.offeredCourseSection.update({
            where: {
                id: payload === null || payload === void 0 ? void 0 : payload.offeredCourseSectionId,
            },
            data: {
                currentlyEnrolledStudent: {
                    increment: 1,
                },
            },
        });
        yield transactionClient.studentSemesterRegistration.updateMany({
            where: {
                // student: {
                //   studentId: student?.id,
                // },
                // semesterRegistration: {
                //   id: semesterRegistration?.id,
                // },
                semesterRegistrationId: semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.id,
                studentId: student === null || student === void 0 ? void 0 : student.id,
            },
            data: {
                totalCreditsTaken: {
                    increment: offeredCourse === null || offeredCourse === void 0 ? void 0 : offeredCourse.course.credits,
                },
            },
        });
    }));
    return {
        message: 'successfully created enroll',
    };
    // const enrollCourse  = await prisma.studentSemesterRegistrationCourse.create({data:
    //   {
    //     studentId:student?.id,
    //     semesterRegistrationId:semesterRegistration?.id,
    //     offeredCourseId:payload.offeredCourseId,
    //     offeredCourseSectionId:payload?.offeredCourseSectionId
    //   }
    // })
    //  return enrollCourse
});
// ! for withdraw ////
const withdrawFromCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  console.log(id,payload,"from enroll");
    const student = yield prisma_1.default.student.findFirst({
        where: {
            studentId: id,
        },
    });
    if (!student) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Student not found');
    }
    //  console.log(student);
    const semesterRegistration = yield prisma_1.default.semesterRegistration.findFirst({
        where: {
            status: client_1.SemesterRegistrationStatus.ONGOING,
        },
    });
    if (!semesterRegistration) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'semesterRegistration not found');
    }
    const offeredCourse = yield prisma_1.default.offeredCourse.findFirst({
        where: {
            id: payload === null || payload === void 0 ? void 0 : payload.offeredCourseId,
        },
        include: {
            course: true,
        },
    });
    if (!offeredCourse) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'offered course not found');
    }
    // ! with transaction
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // ! very important to deleteMany ////
        yield transactionClient.studentSemesterRegistrationCourse.delete({
            where: {
                semesterRegistrationId_studentId_offeredCourseId: {
                    semesterRegistrationId: semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.id,
                    studentId: student === null || student === void 0 ? void 0 : student.id,
                    offeredCourseId: payload.offeredCourseId,
                },
            },
        });
        yield transactionClient.offeredCourseSection.update({
            where: {
                id: payload === null || payload === void 0 ? void 0 : payload.offeredCourseSectionId,
            },
            data: {
                currentlyEnrolledStudent: {
                    decrement: 1,
                },
            },
        });
        console.log(offeredCourse === null || offeredCourse === void 0 ? void 0 : offeredCourse.course.credits, 'offeredCourse?.course.credits');
        yield transactionClient.studentSemesterRegistration.updateMany({
            where: {
                // student: {
                //   studentId: student?.id,
                // },
                // semesterRegistration: {
                //   id: semesterRegistration?.id,
                // },
                semesterRegistrationId: semesterRegistration === null || semesterRegistration === void 0 ? void 0 : semesterRegistration.id,
                studentId: student === null || student === void 0 ? void 0 : student.id,
            },
            data: {
                totalCreditsTaken: {
                    decrement: offeredCourse === null || offeredCourse === void 0 ? void 0 : offeredCourse.course.credits,
                },
            },
        });
    }));
    return {
        message: 'successfully withdraw from course',
    };
    // const enrollCourse  = await prisma.studentSemesterRegistrationCourse.create({data:
    //   {
    //     studentId:student?.id,
    //     semesterRegistrationId:semesterRegistration?.id,
    //     offeredCourseId:payload.offeredCourseId,
    //     offeredCourseSectionId:payload?.offeredCourseSectionId
    //   }
    // })
    //  return enrollCourse
});
exports.studentSemesterRegistrationCourseService = {
    enrollIntoCourse,
    withdrawFromCourse,
};
