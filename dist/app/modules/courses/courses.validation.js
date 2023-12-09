"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesValidation = void 0;
const zod_1 = require("zod");
const createCourses = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is Required (zod)',
        }),
        code: zod_1.z.string({
            required_error: 'code is Required (zod)',
        }),
        credits: zod_1.z.number({
            required_error: 'credits is Required (zod)',
        }),
    })
});
const updateCourses = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is Required (zod)',
        }).optional(),
        code: zod_1.z.string({
            required_error: 'code is Required (zod)',
        }).optional(),
        credits: zod_1.z.string({
            required_error: 'credits is Required (zod)',
        }).optional(),
    })
});
const assignOrRemoveFaculties = zod_1.z.object({
    body: zod_1.z.object({
        faculties: zod_1.z.array(zod_1.z.string(), {
            required_error: "Facultis are required"
        })
    })
});
exports.CoursesValidation = { createCourses, updateCourses, assignOrRemoveFaculties };
