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
exports.CoursesService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("./utils");
const insertDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = data, courseData = __rest(data, ["preRequisiteCourses"]);
    // // ! without transaction ::::
    // const result = await prisma.course.create({
    //   data: courseData,
    // });
    // if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    //   for (let index = 0; index < preRequisiteCourses.length; index++) {
    //     const createPrerequiesite = await prisma.courseToPrerequisite.create({
    //       data: {
    //         courseId: result.id,
    //         prerequisiteId: preRequisiteCourses[index].courseId,
    //       },
    //     });
    //     console.log(createPrerequiesite, 'pressssssss');
    //   }
    // }
    // ! with transaction ////
    const newCourse = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.course.create({
            data: courseData,
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Unable to create course');
        }
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // for (let index = 0; index < preRequisiteCourses.length; index++) {
            //   const createPrerequiesite =
            //     await transactionClient.courseToPrerequisite.create({
            //       data: {
            //         courseId: result?.id,
            //         prerequisiteId: preRequisiteCourses[index].courseId,
            //       },
            //     });
            //   console.log(createPrerequiesite, 'pressssssss');
            // }
            yield (0, utils_1.asyncForEach)(preRequisiteCourses, (preRequisiteCourses) => __awaiter(void 0, void 0, void 0, function* () {
                const createPrerequisite = yield transactionClient.courseToPrerequisite.create({
                    data: {
                        courseId: result === null || result === void 0 ? void 0 : result.id,
                        prerequisiteId: preRequisiteCourses.courseId,
                    },
                });
                console.log(createPrerequisite);
            }));
        }
        return result;
    }));
    // for nested data with course >>>>
    if (newCourse) {
        const responseData = yield prisma_1.default.course.findUnique({
            where: {
                id: newCourse === null || newCourse === void 0 ? void 0 : newCourse.id,
            },
            include: {
                prerequisite: {
                    include: {
                        prerequisite: true,
                    },
                },
                prerequisiteFor: {
                    include: {
                        course: true,
                    },
                },
            },
        });
        return responseData;
    }
    throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'unable to create course');
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
            OR: ['title', 'code', 'credits'].map(field => ({
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
    const result = yield prisma_1.default.course.findMany({
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
            prerequisite: true,
            prerequisiteFor: true,
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
    const result = yield prisma_1.default.course.findUnique({
        where: {
            id,
        },
    });
    return result;
});
// update courses data ///
const updateItoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id, payload);
    const { preRequisiteCourses } = payload, courseData = __rest(payload, ["preRequisiteCourses"]);
    console.log(preRequisiteCourses);
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transactionClient.course.update({
            where: {
                id,
            },
            data: courseData,
            include: {
                prerequisite: true,
                prerequisiteFor: true
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to update the course');
        }
        if (preRequisiteCourses && (preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.length) > 0) {
            const deletePrerequisite = preRequisiteCourses.filter(coursePrerequisite => coursePrerequisite.courseId && (coursePrerequisite === null || coursePrerequisite === void 0 ? void 0 : coursePrerequisite.isDeleted));
            const newPrerequisite = preRequisiteCourses.filter(coursePrerequisite => coursePrerequisite.courseId && !coursePrerequisite.isDeleted);
            // for (let index=0 ; index< deletePrerequisite.length ; index++){
            //   await transactionClient.courseToPrerequisite.deleteMany({
            //     where:{
            //       AND:[
            //         {
            //           courseId:id
            //         },
            //         {
            //           prerequisiteId:deletePrerequisite[index].courseId
            //         }
            //       ]
            //     }
            //   })
            // }
            ///use the asyncFOrFunction
            yield (0, utils_1.asyncForEach)(deletePrerequisite, (deletePreCourse) => __awaiter(void 0, void 0, void 0, function* () {
                yield transactionClient.courseToPrerequisite.deleteMany({
                    where: {
                        AND: [
                            {
                                courseId: id,
                            },
                            {
                                prerequisiteId: deletePreCourse.courseId,
                            },
                        ],
                    },
                });
            }));
            // for(let index = 0 ;index <newPrerequisite.length;index++){
            //   await transactionClient.courseToPrerequisite.create({
            //     data:{
            //       courseId:id,
            //       prerequisiteId:newPrerequisite[index].courseId
            //     }
            //   })
            // }
            yield (0, utils_1.asyncForEach)(newPrerequisite, (insertPrerequisite) => __awaiter(void 0, void 0, void 0, function* () {
                yield transactionClient.courseToPrerequisite.create({
                    data: {
                        courseId: id,
                        prerequisiteId: insertPrerequisite.courseId,
                    },
                });
            }));
            // await asyncForEach(pre)
        }
        return result;
    }));
    const responseData = yield prisma_1.default.course.findUnique({
        where: {
            id,
        },
        include: {
            prerequisite: {
                include: {
                    prerequisite: true,
                },
            },
            prerequisiteFor: {
                include: {
                    course: true,
                },
            },
        },
    });
    return responseData;
});
// for delete data.....
const deleteFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.course.delete({
        where: {
            id,
        },
        // include:{
        //   rooms:true
        // }
    });
    return result;
});
// ! course faculty new model 
const assignFaculties = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🚀 ~ file: courses.service.ts:317 ~ payload:", payload);
    // await prisma.courseFaculty.createMany({
    //   data: payload.map(facultyId => ({
    //     courseId: id,
    //     facultyId: facultyId
    //   })),
    // });
    yield prisma_1.default.courseFaculty.createMany({
        data: payload.map((facultyId) => ({
            courseId: id,
            facultyId: facultyId
        }))
    });
    const assignFacultiesData = yield prisma_1.default.courseFaculty.findMany({
        where: {
            courseId: id
        },
        include: {
            faculty: true
        }
    });
    return assignFacultiesData;
});
const removeCourseFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.courseFaculty.deleteMany({
        where: {
            courseId: id,
            facultyId: {
                // ! important
                in: payload
            }
        }
    });
    const deleteFacultiesData = yield prisma_1.default.courseFaculty.findMany({
        where: {
            courseId: id
        },
        include: {
            faculty: true
        }
    });
    return deleteFacultiesData;
});
exports.CoursesService = {
    insertDB,
    getAllDb,
    getSingleData,
    updateItoDb,
    deleteFromDb,
    assignFaculties,
    removeCourseFaculty
};
