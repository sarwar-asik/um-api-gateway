### all api_endpoints for the backend project

### academic-semester

http://localhost:5000/api/v1/academic-semester (post)

http://localhost:5000/api/v1/academic-semester?page=1&limit=5&sortBy=asc&title=Course1 (GET)

http://localhost:5000/api/v1/academic-semester/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (GET)

### academic-faculty

http://localhost:5000/api/v1/academic-faculty(POST)

http://localhost:5000/api/v1/academic-faculty?page=1&limit=5&sortBy=asc&title=Course1 (GET)

http://localhost:5000/api/v1/academic-faculty/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (GET)

#### Faculty

http://localhost:5000/api/v1/faculty (POST)

http://localhost:5000/api/v1/faculty (GET)

http://localhost:5000/api/v1/faculty/572dc553-9010-4656-8fec-07fa066af76d (GET SINGLE)

http://localhost:5000/api/v1/faculty/572dc553-9010-4656-8fec-07fa066af76d (PATCH)

http://localhost:5000/api/v1/faculty/572dc553-9010-4656-8fec-07fa066af76d (DELETE)

http://localhost:5000/api/v1/faculty/572dc553-9010-4656-8fec-07fa066af76d/assign-courses (POST)

http://localhost:5000/api/v1/faculty/572dc553-9010-4656-8fec-07fa066af76d/remove-courses (DELETE)

http://localhost:5000/api/v1/faculty/my-course (GET)

### academic-department

http://localhost:5000/api/v1/academic-department(POST)

http://localhost:5000/api/v1/academic-department?page=1&limit=5&sortBy=asc&title=Course1 (GET)

http://localhost:5000/api/v1/academic-department/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (GET)

### student

http://localhost:5000/api/v1/students/(POST)

http://localhost:5000/api/v1/students?page=1&limit=5&sortBy=asc&title=Course1 (GET)

http://localhost:5000/api/v1/students/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (GET)

http://localhost:5000/api/v1/students/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (DELETE)

http://localhost:5000/api/v1/students/my-courses?academicSemesterId=e2d134123423dsd12e2354 (GET)


http://localhost:5000/api/v1/students/my-course-schedules (GET)



### building

http://localhost:5000/api/v1/buildings/(POST)

http://localhost:5000/api/v1/buildings?page=1&limit=5&sortBy=asc&title=Course1 (GET)

http://localhost:5000/api/v1/buildings/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (GET)

### room

http://localhost:5000/api/v1/rooms/(POST)

http://localhost:5000/api/v1/rooms?page=1&limit=5&sortBy=asc&title=Course1 (GET)

http://localhost:5000/api/v1/rooms/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (GET)

### courses

http://localhost:5000/api/v1/courses/(POST)

http://localhost:5000/api/v1/courses?page=1&limit=5&sortBy=asc&title=Course1 (GET)

http://localhost:5000/api/v1/courses/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (GET)

http://localhost:5000/api/v1/courses/19c54336-3fb4-4e83-962d-abcdd4d42cb2 (PUT)

### courses-faculty

http://localhost:5000/api/v1/courses/c67ce94d-6e44-4508-9a1d-8a1677d338f8/remove-faculties(POST)

http://localhost:5000/api/v1/courses/c67ce94d-6e44-4508-9a1d-8a1677d338f8/remove-faculties(DELETE)

### offered-course

http://localhost:5000/api/v1/offered-course(POST)

http://localhost:5000/api/v1/offered-course(GET)

### offered-course-section

http://localhost:5000/api/v1/offered-course-section(POST)

http://localhost:5000/api/v1/offered-course-section(GET)

### offered-course-section-schedules

http://localhost:5000/api/v1/offered-course-class-schedules (GET)

http://localhost:5000/api/v1/offered-course-class-schedules (POST)

### semester-registration

http://localhost:5000/api/v1/semester-registration (POST) //create-semester-registration

http://localhost:5000/api/v1/semester-registration (GET) ///get-semester-registration

http://localhost:5000/api/v1/semester-registration/abe94d6d-4ba7-422c-9bd5-0aa8d226932f (PUT)

http://localhost:5000/api/v1/semester-registration/start-registration (POST)

http://localhost:5000/api/v1/semester-registration/enroll-into-course (POST)

http://localhost:5000/api/v1/semester-registration/withdraw-from-course (POST)

http://localhost:5000/api/v1/semester-registration/confirm-my-registration (POST)

http://localhost:5000/api/v1/semester-registration/get-my-registration (GET)

http://localhost:5000/api/v1/semester-registration/start-new-semester/fc4c3fa6-9392-4b3f-8ded-285da61ee317 (POST)

http://localhost:5000/api/v1/semester-registration/get-my-semester-courses

#### student enroll

http://localhost:5000/api/v1/student-enrolled-courses (POST)

http://localhost:5000/api/v1/student-enrolled-courses(GET)

http://localhost:5000/api/v1/student-enrolled-courses/c035f819-1190-4510-be0e-a1efc3301c53(GET)

#### student enroll-marks

http://localhost:5000/api/v1/student-enroll-course-marks/update-marks (PATCH)
