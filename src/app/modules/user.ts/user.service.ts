import { Request } from 'express';
import { fileUploadHelper } from '../../../helpers/FileUploadHelpers';

const createStudent = async (req: Request) => {
  console.log(req.file, 'files');
  const file = req.file;
  const uploadedImage = await fileUploadHelper.uploadToCloudinary(file)

  return uploadedImage
  
};

export const UserService = { createStudent };
