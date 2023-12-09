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
exports.OfferedCourseService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../courses/utils");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const insertDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseIds, academicDepartmentId, semesterRegistrationId } = data;
    const result = [];
    yield (0, utils_1.asyncForEach)(courseIds, (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const alreadyExist = yield prisma_1.default.offeredCourse.findFirst({
            where: {
                courseId,
                academicDepartmentId,
                semesterRegistrationId,
            },
        });
        if (!alreadyExist) {
            const insertOfferedCourse = yield prisma_1.default.offeredCourse.create({
                data: {
                    academicDepartmentId,
                    semesterRegistrationId,
                    courseId,
                },
                include: {
                    course: true,
                    academicDepartment: true,
                    semesterRegistration: true,
                },
            });
            result.push(insertOfferedCourse);
        }
    }));
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
            OR: ['courseId', 'academicDepartmentId', 'semesterRegistrationId'].map(field => ({
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
    const result = yield prisma_1.default.offeredCourse.findMany({
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
            course: true,
            academicDepartment: true,
            semesterRegistration: true,
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
    const result = yield prisma_1.default.offeredCourse.findUnique({
        where: {
            id,
        },
    });
    return result;
});
exports.OfferedCourseService = { insertDB, getAllDb, getSingleData };
