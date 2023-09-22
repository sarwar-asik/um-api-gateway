import { NextFunction, Request, Response } from 'express';
import { fileUploadHelper } from '../../../helpers/FileUploadHelpers';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("from create-user controller", req?.body);
  console.log('req?.file', req.file, 'req.body', req.body);
  // fileUploadHelper.uploadToCloudinary()
};

export const UserController = {
  createStudent
};
