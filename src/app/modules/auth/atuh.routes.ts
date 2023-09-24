import express from 'express';
import { AuthenticationController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthenticationController.loginUser
);

router.post(
  '/refreshToken',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthenticationController.refreshToken
);
router.post(
  '/change-password',

  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AuthenticationController.changePassword
);

export const authRoutes = router;
