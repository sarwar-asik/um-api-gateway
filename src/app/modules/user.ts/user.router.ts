import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { fileUploadHelper } from '../../../helpers/FileUploadHelpers';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  fileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createUserZodSchema.parse(JSON.parse(req.body.data));
    return  UserController.createStudent(req,res,next)
  }
  //   UserController.createStudent
);

export const userRouter = router;
