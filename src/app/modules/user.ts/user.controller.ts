import { NextFunction, Request, Response } from 'express';
import { fileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { UserService } from './user.service';
import sendResponse from '../../../shared/response';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("from create-user controller", req?.body);
//   console.log('req?.file', req.file, 'req.body', req.body);
  // fileUploadHelper.uploadToCloudinary()
  const result = await UserService.createStudent(req)

  sendResponse(res,{
    statusCode:400,
    message:"created user",
    success:true,
    data:result
  })
};

export const UserController = {
  createStudent
};
