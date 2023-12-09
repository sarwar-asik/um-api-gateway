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
exports.AcademicSemesterServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const redis_1 = require("../../../shared/redis");
const insertDB = (semesterData) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterTitleCodeMapper[semesterData.title] !== semesterData.code) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Semester Code');
    }
    const result = yield prisma_1.default.academicSemester.create({
        data: semesterData
    });
    // ! for publish in Redis ::::
    if (result) {
        yield redis_1.RedisClient.publish(academicSemester_constant_1.EVENT_ACADEMIC_SEMESTER_CREATED, JSON.stringify(result));
    }
    return result;
});
const getAllDb = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    // !for pagination
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    //   console.log('page',page,'limit',limit,'skip',skip)
    //   ! for filters
    console.log(filters, 'ffffff');
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    console.log('🚀 ~ file: academicSemester.services.ts:29 ~ filtersData:', filtersData);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: ['title', 'code', 'startMonth', 'endMonth'].map(field => ({
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
    const result = yield prisma_1.default.academicSemester.findMany({
        // where: {
        //   OR: [
        //     {
        //       title: {
        //         contains: searchTerm,
        //         mode: 'insensitive',
        //       },
        //     },
        //     {
        //       code: {
        //         contains: searchTerm,
        //         mode: 'insensitive',
        //       },
        //     },
        //   ],
        // },
        where: whereCondition,
        skip,
        take: limit,
        // orderBy:{
        //     createdAt:'desc'
        // }
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
    const result = yield prisma_1.default.academicSemester.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateOneInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.academicSemester.update({
        where: {
            id
        },
        data: payload
    });
    if (result) {
        yield redis_1.RedisClient.publish(academicSemester_constant_1.EVENT_ACADEMIC_SEMESTER_UPDATED, JSON.stringify(result));
    }
    return result;
});
const deleteByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.academicSemester.delete({
        where: {
            id
        }
    });
    console.log("deleted", result);
    if (result) {
        yield redis_1.RedisClient.publish(academicSemester_constant_1.EVENT_ACADEMIC_SEMESTER_DELETED, JSON.stringify(result));
    }
    return result;
});
exports.AcademicSemesterServices = { insertDB, getAllDb, getSingleData, updateOneInDB, deleteByIdFromDB };
