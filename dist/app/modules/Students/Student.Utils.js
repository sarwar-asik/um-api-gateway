"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentUtils = void 0;
const groupByAcademicSemester = (data) => {
    //   console.log(data);
    const groupData = data === null || data === void 0 ? void 0 : data.reduce((result, course) => {
        // console.log("result",result,course);
        const academicSemester = course === null || course === void 0 ? void 0 : course.academicSemester;
        const academicSemesterId = academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.id;
        const existingGroup = result === null || result === void 0 ? void 0 : result.find((group) => { var _a; return ((_a = group === null || group === void 0 ? void 0 : group.academicSemester) === null || _a === void 0 ? void 0 : _a.id) === academicSemesterId; });
        if (existingGroup) {
            existingGroup.completedCourses.push({
                id: course === null || course === void 0 ? void 0 : course.id,
                createdAt: course === null || course === void 0 ? void 0 : course.createdAt,
                updatedAt: course === null || course === void 0 ? void 0 : course.updatedAt,
                courseId: course === null || course === void 0 ? void 0 : course.courseId,
                studentId: course === null || course === void 0 ? void 0 : course.studentId,
                grade: course === null || course === void 0 ? void 0 : course.grade,
                point: course === null || course === void 0 ? void 0 : course.point,
                totalMarks: course === null || course === void 0 ? void 0 : course.totalMarks,
                status: course === null || course === void 0 ? void 0 : course.status,
                course: course === null || course === void 0 ? void 0 : course.course
            });
        }
        else {
            result === null || result === void 0 ? void 0 : result.push({
                academicSemester,
                completedCourses: [
                    {
                        id: course === null || course === void 0 ? void 0 : course.id,
                        createdAt: course === null || course === void 0 ? void 0 : course.createdAt,
                        updatedAt: course === null || course === void 0 ? void 0 : course.updatedAt,
                        courseId: course === null || course === void 0 ? void 0 : course.courseId,
                        studentId: course === null || course === void 0 ? void 0 : course.studentId,
                        grade: course === null || course === void 0 ? void 0 : course.grade,
                        point: course === null || course === void 0 ? void 0 : course.point,
                        totalMarks: course === null || course === void 0 ? void 0 : course.totalMarks,
                        status: course === null || course === void 0 ? void 0 : course.status,
                        course: course === null || course === void 0 ? void 0 : course.course
                    }
                ]
            });
        }
        return result;
    }, []);
    return groupData;
};
exports.StudentUtils = {
    groupByAcademicSemester,
};
