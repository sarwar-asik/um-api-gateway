"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseClassScheduleFilterableFields = exports.offeredCourseClassScheduleRelationalFieldsMapper = exports.offeredCourseClassScheduleRelationalFields = exports.OfferedCourseClassScheduleSearchableFields = void 0;
exports.OfferedCourseClassScheduleSearchableFields = ['dayOfWeek'];
// used in service ?:::::
exports.offeredCourseClassScheduleRelationalFields = [
    'offeredCourseSectionId',
    'semesterRegistrationId',
    'facultyId',
    'roomId',
];
// write schema model name with carefully these are foreiggn key
exports.offeredCourseClassScheduleRelationalFieldsMapper = {
    offeredCourseSectionId: 'offeredCourseSection',
    facultyId: 'faculty',
    roomId: 'room',
    semesterRegistrationId: 'semesterRegistration'
};
// used in controller ::::
exports.offeredCourseClassScheduleFilterableFields = [
    'searchTerm',
    'dayOfWeek',
    'offeredCourseSectionId',
    'semesterRegistrationId',
    'roomId',
    'facultyId'
];
