import { Request } from 'express';
import { fileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { IUploadFile, IcloudinaryResponse } from '../../../interfaces/fileUpload';
import { AuthService } from '../../../shared/axios';
import { IGenericResponse } from '../../../interfaces/common';

const createStudent = async (req: Request) => {
  console.log(req.file, 'files');
  const file = req.file as IUploadFile;

  const uploadedImage: IcloudinaryResponse = await fileUploadHelper.uploadToCloudinary(file);
  //   console.log(uploadedImage);

  console.log(uploadedImage, 'uploadedImage');

  if (uploadedImage) {
    req.body.profileImage = uploadedImage?.secure_url;
  }
  const { academicDepartment, academicSemester, academicFaculty } = req.body?.student;

  console.log(academicDepartment, academicSemester, academicFaculty, '...........student data');
  // for academicDepartment
  const academicDepartmentResponse = await AuthService.get(
    `/academic-departments?syncId=${academicDepartment}`
  );

  console.log(academicDepartmentResponse, 'academicDepartmentResponse');

  if (academicDepartmentResponse.data && Array.isArray(academicDepartmentResponse.data)) {
    req.body.student.academicDepartment = academicDepartmentResponse.data[0].id;
  }

  // for academicSemester

  const academicSemesterResponse = await AuthService.get(
    `/academic-semesters?syncId=${academicSemester}`
  );

  console.log(academicSemesterResponse, 'academicSemesterResponse');
  if (academicSemesterResponse.data && Array.isArray(academicSemesterResponse.data)) {
    req.body.student.academicSemester = academicSemesterResponse.data[0].id;
  }

  // for academicFaulty :::
  const academicFacultyResponse = await AuthService.get(
    `/academic-faculties?syncId=${academicFaculty}`
  );

  console.log(academicFacultyResponse, 'academicFacultyResponse');

  if (academicFacultyResponse.data && Array.isArray(academicFacultyResponse.data)) {
    req.body.student.academicFaculty = academicFacultyResponse.data[0].id;
  }

  const response: IGenericResponse = await AuthService.post('/users/create-student', req.body, {
    headers: {
      Authorization: req.headers.authorization
    }
  });

  console.log(response, 'response from AuthService');

  return response;

  // return uploadedImage;
};

export const UserService = { createStudent };
