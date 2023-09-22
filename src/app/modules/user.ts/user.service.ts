import { Request } from 'express';
import { fileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { IUploadFile, IcloudinaryResponse } from '../../../interfaces/fileUpload';

const createStudent = async (req: Request) => {
  console.log(req.file, 'files');
  const file = req.file as IUploadFile

  const uploadedImage :IcloudinaryResponse= await fileUploadHelper.uploadToCloudinary(file)
  console.log(uploadedImage);
  
  return uploadedImage
  
};

export const UserService = { createStudent };
