"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidation = void 0;
const zod_1 = require("zod");
const createOfferedCourse = zod_1.z.object({
    body: zod_1.z.object({
        courseIds: zod_1.z.array(zod_1.z.string({
            required_error: 'courseId is Required (zod)'
        }), {
            required_error: "courseIds is required (zod)"
        }),
        academicDepartmentId: zod_1.z.string({
            required_error: 'academicDepartmentId is Required (zod)',
        }),
        semesterRegistrationId: zod_1.z.string({
            required_error: 'semesterRegistrationId is Required (zod)',
        }),
    }),
});
exports.OfferedCourseValidation = { createOfferedCourse };
