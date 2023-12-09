"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistrationUtils = void 0;
const getAvailableCourses = (offeredCourses, studentCompleteCourses, studentCurrentlyTakenCourses) => {
    var _a;
    // console.log("availableCourse",offeredCourse,studentCompleteCourses,studentCurrentlyTakenCourses);
    //   console.log(studentCurrentlyTakenCourses);
    const completedCoursesId = studentCompleteCourses.map((course) => course === null || course === void 0 ? void 0 : course.id);
    // console.log(completedCoursesId);
    const availableCourseList = (_a = offeredCourses === null || offeredCourses === void 0 ? void 0 : offeredCourses.filter((offeredCourse) => !completedCoursesId.includes(offeredCourse.courseId))) === null || _a === void 0 ? void 0 : _a.filter(course => {
        const preRequisites = course.course.preRequisite;
        //   console.log(preRequisites);
        if ((preRequisites === null || preRequisites === void 0 ? void 0 : preRequisites.length) === 0) {
            return true;
        }
        else {
            const preRequisiteIds = preRequisites === null || preRequisites === void 0 ? void 0 : preRequisites.map((preRequisite) => preRequisite.preRequisiteId);
            // console.log(preRequisiteIds);
            // ! !important every with return true or false for your condition
            return preRequisiteIds === null || preRequisiteIds === void 0 ? void 0 : preRequisiteIds.every((id) => preRequisiteIds.includes(id));
        }
    }).map((course) => {
        var _a;
        const isAlreadyTakenCourse = studentCurrentlyTakenCourses.find((c) => c.offeredCourseId === (course === null || course === void 0 ? void 0 : course.id));
        if (isAlreadyTakenCourse) {
            course.offeredCourseSections.map((section) => {
                if ((section === null || section === void 0 ? void 0 : section.id) === isAlreadyTakenCourse.offeredCourseSectionId) {
                    section.isTaken = true;
                }
                else {
                    section.isTaken = false;
                }
            });
            return Object.assign(Object.assign({}, course), { isTaken: true });
        }
        else {
            (_a = course === null || course === void 0 ? void 0 : course.offeredCourseSections) === null || _a === void 0 ? void 0 : _a.map((section) => {
                section.isTaken = false;
            });
            return Object.assign(Object.assign({}, course), { isTaken: false });
        }
    });
    // console.log(availableCourseList);
    return availableCourseList;
};
exports.SemesterRegistrationUtils = {
    getAvailableCourses,
};
