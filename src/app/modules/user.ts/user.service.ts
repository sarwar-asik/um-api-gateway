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

  const academicDepartmentResponse = await AuthService.get(`/`)
  

  return uploadedImage;
};

export const UserService = { createStudent };
