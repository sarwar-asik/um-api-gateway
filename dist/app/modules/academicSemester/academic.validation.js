"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemester = zod_1.z.object({
    body: zod_1.z.object({
        year: zod_1.z.number({
            required_error: 'year is Required (zod)',
        }),
        title: zod_1.z.string({
            required_error: 'title is Required (zod)',
        }),
        code: zod_1.z.string({
            required_error: 'code is Required (zod)',
        }),
        startMonth: zod_1.z.string({
            required_error: 'startMonth is Required (zod)',
        }),
        endMonth: zod_1.z.string({
            required_error: 'endMonth is Required (zod)',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.academicSemesterTitles]).optional(),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes]).optional(),
        year: zod_1.z.number().optional(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths]).optional(),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths]).optional()
    })
});
exports.AcademicSemesterValidation = {
    createAcademicSemester,
    update
};
