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
exports.FacultyService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const faculty_constants_1 = require("./faculty.constants");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faculty.create({
        data,
        include: {
            academicFaculty: true,
            academicDepartment: true,
        },
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: faculty_constants_1.facultySearchableFields.map(field => ({
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
                if (faculty_constants_1.facultyRelationalFields.includes(key)) {
                    return {
                        [faculty_constants_1.facultyRelationalFieldsMapper[key]]: {
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
    const result = yield prisma_1.default.faculty.findMany({
        include: {
            academicFaculty: true,
            academicDepartment: true,
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
    const total = yield prisma_1.default.faculty.count({
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
    const result = yield prisma_1.default.faculty.findUnique({
        where: {
            id,
        },
        include: {
            academicFaculty: true,
            academicDepartment: true,
        },
    });
    return result;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faculty.update({
        where: {
            id,
        },
        data: payload,
        include: {
            academicFaculty: true,
            academicDepartment: true,
        },
    });
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faculty.delete({
        where: {
            id,
        },
        include: {
            academicFaculty: true,
            academicDepartment: true,
        },
    });
    return result;
});
const assignCourses = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.courseFaculty.createMany({
        data: payload.map(courseId => ({
            facultyId: id,
            courseId: courseId,
        })),
    });
    const assignCoursesData = yield prisma_1.default.courseFaculty.findMany({
        where: {
            facultyId: id,
        },
        include: {
            course: true,
        },
    });
    return assignCoursesData;
});
const removeCourses = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.courseFaculty.deleteMany({
        where: {
            facultyId: id,
            courseId: {
                in: payload,
            },
        },
    });
    const assignCoursesData = yield prisma_1.default.courseFaculty.findMany({
        where: {
            facultyId: id,
        },
        include: {
            course: true,
        },
    });
    return assignCoursesData;
});
// get faculty courses like student and other  ///
const myCourses = (authUser, filter) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(authUser, 'auth id', filter);
    if (!(filter === null || filter === void 0 ? void 0 : filter.academicSemesterId)) {
        const currentSemester = yield prisma_1.default.academicSemester.findFirst({
            where: {
                isCurrent: true,
            },
        });
        filter.academicSemesterId = currentSemester === null || currentSemester === void 0 ? void 0 : currentSemester.id;
    }
    const offeredCourseSection = yield prisma_1.default.offeredCourseSection.findMany({
        where: {
            offeredCourseClassSchedule: {
                // ! !important for best query by this or other
                some: {
                    faculty: {
                        facultyId: authUser === null || authUser === void 0 ? void 0 : authUser.userId,
                    },
                },
            },
            offeredCourse: {
                semesterRegistration: {
                    academicSemester: {
                        id: filter.academicSemesterId,
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
            offeredCourseClassSchedule: {
                include: {
                    room: {
                        include: {
                            building: true,
                        },
                    },
                    // faculty:{
                    //     include:{
                    //         courses:true
                    //     }
                    // }
                },
            },
        },
    });
    console.log('offeredCourseSection', offeredCourseSection);
    const courseAndSchedule = offeredCourseSection.reduce((acc, obj) => {
        var _a;
        console.log('🚀 ~ file: faculty.service.ts:256 ~ acc:', acc);
        console.log('🚀 ~ file: faculty.service.ts:257 ~ obj:', obj);
        // // console.log(obj, 'ob/j..');
        const course = (_a = obj === null || obj === void 0 ? void 0 : obj.offeredCourse) === null || _a === void 0 ? void 0 : _a.course;
        const classSchedules = obj.offeredCourseClassSchedule;
        const existingCourse = acc.find((item) => { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.course) === null || _a === void 0 ? void 0 : _a.id) === (course === null || course === void 0 ? void 0 : course.id); });
        if (existingCourse) {
            existingCourse.sections.push({
                section: obj,
                classSchedules,
            });
        }
        else {
            acc.push({
                course,
                sections: [
                    {
                        section: obj,
                        classSchedules,
                    },
                ],
            });
        }
        return acc;
    }, []);
    return courseAndSchedule;
    // return offeredCourseSection;
});
const createFacultyFromEvent = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const faculty = {
        facultyId: e.id,
        firstName: e.name.firstName,
        lastName: e.name.lastName,
        middleName: e.name.middleName,
        profileImage: e.profileImage,
        email: e.email,
        contactNo: e.contactNo,
        gender: e.gender,
        bloodGroup: e.bloodGroup,
        designation: e.designation,
        academicDepartmentId: e.academicDepartment.syncId,
        academicFacultyId: e.academicFaculty.syncId,
    };
    const data = yield insertIntoDB(faculty);
    console.log('RES: ', data);
});
const updateFacultyFromEvent = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.faculty.findFirst({
        where: {
            facultyId: e.id,
        },
    });
    if (!isExist) {
        createFacultyFromEvent(e);
    }
    else {
        const facultyData = {
            facultyId: e.id,
            firstName: e.name.firstName,
            lastName: e.name.lastName,
            middleName: e.name.middleName,
            profileImage: e.profileImage,
            email: e.email,
            contactNo: e.contactNo,
            gender: e.gender,
            bloodGroup: e.bloodGroup,
            designation: e.designation,
            academicDepartmentId: e.academicDepartment.syncId,
            academicFacultyId: e.academicFaculty.syncId,
        };
        const res = yield prisma_1.default.faculty.updateMany({
            where: {
                facultyId: e.id,
            },
            data: facultyData,
        });
        console.log(res);
    }
});
exports.FacultyService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    assignCourses,
    removeCourses,
    myCourses,
    createFacultyFromEvent,
    updateFacultyFromEvent,
};
