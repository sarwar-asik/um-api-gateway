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
exports.StudentEnrollCourseMarkService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const studentEnrollCourseMark_utils_1 = require("./studentEnrollCourseMark.utils");
const createStudentEnrollCourseDefaultMarks = (prismaClient, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Default marks', prismaClient, payload);
    const isExistMidTermData = yield prismaClient.studentEnrolledCourseMark.findFirst({
        where: {
            examType: client_1.ExamType.MIDTERM,
            student: {
                id: payload === null || payload === void 0 ? void 0 : payload.studentId,
            },
            studentEnrolledCourse: {
                id: payload === null || payload === void 0 ? void 0 : payload.studentEnrolledCourseId,
            },
            academicSemester: {
                id: payload.academicSemesterId,
            },
        },
    });
    if (!isExistMidTermData) {
        //   created for midTime ///
        yield prismaClient.studentEnrolledCourseMark.create({
            data: {
                // ! !important used connect in studentEnrollMark
                student: {
                    connect: {
                        id: payload === null || payload === void 0 ? void 0 : payload.studentId,
                    },
                },
                studentEnrolledCourse: {
                    connect: {
                        id: payload === null || payload === void 0 ? void 0 : payload.studentEnrolledCourseId,
                    },
                },
                academicSemester: {
                    connect: {
                        id: payload === null || payload === void 0 ? void 0 : payload.academicSemesterId,
                    },
                },
                examType: client_1.ExamType.MIDTERM,
            },
        });
    }
    const isExistFinalData = yield prismaClient.studentEnrolledCourseMark.findFirst({
        where: {
            examType: client_1.ExamType.FINAL,
            student: {
                id: payload === null || payload === void 0 ? void 0 : payload.studentId,
            },
            studentEnrolledCourse: {
                id: payload === null || payload === void 0 ? void 0 : payload.studentEnrolledCourseId,
            },
            academicSemester: {
                id: payload.academicSemesterId,
            },
        },
    });
    if (!isExistFinalData) {
        //   created for midTime ///
        yield prismaClient.studentEnrolledCourseMark.create({
            data: {
                // ! !important used connect in studentEnrollMark
                student: {
                    connect: {
                        id: payload === null || payload === void 0 ? void 0 : payload.studentId,
                    },
                },
                studentEnrolledCourse: {
                    connect: {
                        id: payload === null || payload === void 0 ? void 0 : payload.studentEnrolledCourseId,
                    },
                },
                academicSemester: {
                    connect: {
                        id: payload === null || payload === void 0 ? void 0 : payload.academicSemesterId,
                    },
                },
                examType: client_1.ExamType.FINAL,
            },
        });
    }
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const marks = yield prisma_1.default.studentEnrolledCourseMark.findMany({
        where: {
            student: {
                id: filters.studentId,
            },
            academicSemester: {
                id: filters.academicSemesterId,
            },
            studentEnrolledCourse: {
                course: {
                    id: filters.courseId,
                },
            },
        },
        include: {
            studentEnrolledCourse: {
                include: {
                    course: true,
                },
            },
            student: true,
        },
    });
    return {
        meta: {
            total: marks.length,
            page,
            limit,
        },
        data: marks,
    };
});
const updateStudentMarks = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    const { studentId, academicSemesterId, courseId, examType, marks } = payload;
    const studentEnrollCourseMarks = yield prisma_1.default.studentEnrolledCourseMark.findFirst({
        where: {
            student: {
                id: studentId,
            },
            academicSemester: {
                id: academicSemesterId,
            },
            studentEnrolledCourse: {
                course: {
                    id: courseId,
                },
            },
        },
    });
    if (!studentEnrollCourseMarks) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Student enrolled course mark not found ');
    }
    const { grade } = studentEnrollCourseMark_utils_1.studentEnrollCourseMarkUtils.getGradeFromMarks(marks);
    const updateMarks = yield prisma_1.default.studentEnrolledCourseMark.update({
        where: {
            id: studentEnrollCourseMarks.id,
        },
        data: {
            marks,
            grade,
            examType,
        },
    });
    return updateMarks;
});
const updateFinalMarks = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(payload);
    const { studentId, academicSemesterId, courseId } = payload;
    const studentEnrollCourse = yield prisma_1.default.studentEnrolledCourse.findFirst({
        where: {
            student: {
                id: studentId,
            },
            academicSemester: {
                id: academicSemesterId,
            },
            course: {
                id: courseId,
            },
        },
    });
    if (!studentEnrollCourse) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'studentEnrolledCourse data not found');
    }
    const studentEnrollCourseMarks = yield prisma_1.default.studentEnrolledCourseMark.findMany({
        where: {
            student: {
                id: studentId,
            },
            academicSemester: {
                id: academicSemesterId,
            },
            studentEnrolledCourse: {
                course: {
                    id: courseId,
                },
            },
        },
    });
    if (!(studentEnrollCourseMarks === null || studentEnrollCourseMarks === void 0 ? void 0 : studentEnrollCourseMarks.length)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'studentEnrolledCourseMarks data not found');
    }
    const midTermMarks = ((_a = studentEnrollCourseMarks.find(item => (item === null || item === void 0 ? void 0 : item.examType) === client_1.ExamType.MIDTERM)) === null || _a === void 0 ? void 0 : _a.marks) || 0;
    const finalTermMarks = ((_b = studentEnrollCourseMarks.find(item => (item === null || item === void 0 ? void 0 : item.examType) === client_1.ExamType.FINAL)) === null || _b === void 0 ? void 0 : _b.marks) || 0;
    // console.log(midTermMarks,finalTermMarks);
    const totalFinalMarks = Math.ceil(midTermMarks * 0.4) + Math.ceil(finalTermMarks * 0.6); ///math used for round figure marks
    console.log('🚀 totalFinalMarks:', totalFinalMarks);
    const result = studentEnrollCourseMark_utils_1.studentEnrollCourseMarkUtils.getGradeFromMarks(totalFinalMarks);
    console.log(result, 'result');
    yield prisma_1.default.studentEnrolledCourse.updateMany({
        where: {
            student: {
                id: studentId,
            },
            academicSemester: {
                id: academicSemesterId,
            },
            course: {
                id: courseId,
            },
        },
        data: {
            grade: result.grade,
            point: result === null || result === void 0 ? void 0 : result.point,
            totalMarks: totalFinalMarks,
            status: client_1.StudentEnrolledCourseStatus.COMPLETED,
        },
    });
    const grades = yield prisma_1.default.studentEnrolledCourse.findMany({
        where: {
            student: {
                id: studentId,
            },
            status: client_1.StudentEnrolledCourseStatus.COMPLETED,
        },
        include: {
            course: true,
        },
    });
    const academicResult = yield studentEnrollCourseMark_utils_1.studentEnrollCourseMarkUtils.calcCGPAandGrade(grades);
    const studentAcadeInfo = yield prisma_1.default.studentAcademicInfo.findFirst({
        where: {
            student: {
                id: studentId,
            },
        },
    });
    if (studentAcadeInfo) {
        yield prisma_1.default.studentAcademicInfo.update({
            where: {
                id: studentAcadeInfo.id,
            },
            data: {
                totalCompletedCredit: academicResult === null || academicResult === void 0 ? void 0 : academicResult.totalCompletedCredit,
                cgpa: academicResult === null || academicResult === void 0 ? void 0 : academicResult.cgpa,
            },
        });
    }
    else {
        yield prisma_1.default.studentAcademicInfo.create({
            data: {
                student: {
                    connect: {
                        id: studentId,
                    },
                },
                totalCompletedCredit: academicResult === null || academicResult === void 0 ? void 0 : academicResult.totalCompletedCredit,
                cgpa: academicResult === null || academicResult === void 0 ? void 0 : academicResult.cgpa,
            },
        });
    }
    return grades;
});
exports.StudentEnrollCourseMarkService = {
    createStudentEnrollCourseDefaultMarks,
    getAllFromDB,
    updateStudentMarks,
    updateFinalMarks,
};
