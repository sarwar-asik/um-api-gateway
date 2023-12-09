"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseSectionValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        offeredCourseId: zod_1.z.string({
            required_error: 'offeredCourseId is required'
        }),
        currentlyEnrolledStudent: zod_1.z.number({
            required_error: 'currentlyEnrolledStudent is required'
        }), maxCapacity: zod_1.z.number({
            required_error: 'maxCapacity is required'
        }),
        title: zod_1.z.string({
            required_error: 'title is required'
        })
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        maxCapacity: zod_1.z.number().optional(),
        title: zod_1.z.string().optional()
    })
});
exports.OfferedCourseSectionValidation = {
    create,
    update
};
