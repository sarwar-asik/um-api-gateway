import { Request } from 'express';
import { fileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { IUploadFile, IcloudinaryResponse } from '../../../interfaces/fileUpload';
import { AuthService } from '../../../shared/axios';

const createStudent = async (req: Request) => {
  console.log(req.file, 'files');
  const file = req.file as IUploadFile;

  const uploadedImage: IcloudinaryResponse = await fileUploadHelper.uploadToCloudinary(file);
  //   console.log(uploadedImage);
  if (uploadedImage) {
    req.body.profileImage = uploadedImage?.secure_url;
  }
  const { academicDepartment,academicSemester,academicFaculty } = req?.body;
  // for academicDepartment
  const academicDepartmentResponse = await AuthService.get(
    `/academic-departments?syncId=${academicDepartment}`
  );

  console.log(academicDepartmentResponse);
  if (academicDepartmentResponse.data && Array.isArray(academicDepartmentResponse.data)) {
    req.body.student.academicDepartment = academicDepartmentResponse.data[0].id;
  }

  // for academicSemester 

  const academicSemesterResponse = await AuthService.get(
    `/academic-semesters?syncId=${academicSemester}`
  );

  console.log(academicSemesterResponse);
  if (academicSemesterResponse.data && Array.isArray(academicSemesterResponse.data)) {
    req.body.student.academicSemester = academicSemesterResponse.data[0].id;
  }

  // for academicFaulty :::

  const academicFacultyResponse = await AuthService.get(
    `/academic-Faculty?syncId=${academicFaculty}`
  );

  console.log(academicFacultyResponse);
  if (academicFacultyResponse.data && Array.isArray(academicFacultyResponse.data)) {
    req.body.student.academicFaculty = academicFacultyResponse.data[0].id;
  }

  return uploadedImage;
};

export const UserService = { createStudent };
