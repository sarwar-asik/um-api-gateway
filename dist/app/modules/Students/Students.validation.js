"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsValidation = void 0;
const zod_1 = require("zod");
const createStudents = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z.string({
            required_error: 'studentID is Required (zod)',
        }),
        firstName: zod_1.z.string({
            required_error: 'firstName is Required (zod)',
        }),
        lastName: zod_1.z.string({
            required_error: 'lastName is Required (zod)',
        }),
        middleName: zod_1.z.string({
            required_error: 'middleName is Required (zod)',
        }),
        profileImage: zod_1.z.string({
            required_error: 'profileImage is Required (zod)',
        }),
        email: zod_1.z.string({
            required_error: 'email is Required (zod)',
        }),
        contactNo: zod_1.z.string({
            required_error: 'contactNo is Required (zod)',
        }),
        gender: zod_1.z.string({
            required_error: 'gendar is Required (zod)',
        }),
        bloodGroup: zod_1.z.string({
            required_error: 'bloodGroup is Required (zod)',
        }),
        academicSemesterId: zod_1.z.string({
            required_error: 'academicSemestarId is Required (zod)',
        }),
        academicDepartmentId: zod_1.z.string({
            required_error: 'academicDepartmentId is Required (zod)',
        }),
        academicFacultyId: zod_1.z.string({
            required_error: 'academicFacultyId is Required (zod)',
        }),
    }),
});
const updateStudents = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z.string().optional(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        academicSemesterId: zod_1.z.string().optional(),
        academicDepartmentId: zod_1.z.string().optional(),
        academicFacultyId: zod_1.z.string().optional(),
    }),
});
exports.StudentsValidation = { createStudents, updateStudents };
