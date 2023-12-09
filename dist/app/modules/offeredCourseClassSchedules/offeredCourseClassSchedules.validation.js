"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseClassSchedulesValidation = void 0;
const zod_1 = require("zod");
const createOfferedCourseClassSchedules = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string({
            required_error: 'startTime is Required (zod)',
        }),
        endTime: zod_1.z.string({
            required_error: 'endTime is Required (zod)',
        }),
        dayOfWeek: zod_1.z.string({
            required_error: 'dayOfWeek is Required (zod)',
        }),
        offeredCourseSectionId: zod_1.z.string({
            required_error: 'offeredCourseSectionId is Required (zod)',
        }),
        semesterRegistrationId: zod_1.z.string({
            required_error: 'semesterRegistrationId is Required (zod)',
        }),
        roomId: zod_1.z.string({
            required_error: 'roomId is Required (zod)',
        }),
        facultyId: zod_1.z.string({
            required_error: 'facultyId is Required (zod)',
        })
    }),
});
exports.OfferedCourseClassSchedulesValidation = { createOfferedCourseClassSchedules };
