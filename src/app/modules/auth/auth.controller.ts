import { NextFunction, Request, Response } from 'express';
import { AuthenticationService } from './auth.service';
import sendResponse from '../../../shared/response';
import config from '../../../config';
import httpStatus from 'http-status';

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthenticationService.loginUser(req);
    // console.log("🚀 ~ file: auth.controller.ts:9 ~ loginUser ~ result:", result)
    const { refreshToken, ...others } = result.data;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true
    };

    res.cookie('refreshToken', result.data.refreshToken, cookieOptions);

    console.log(others);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Successfully Login  user',
      success: true,
      data: others
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthenticationService.refreshToken(req);
    // console.log(result);
    const { accessToken } = result.data;

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true
    };

    res.cookie('refreshToken', result.data.accessToken, cookieOptions);

    sendResponse(res, {
      statusCode: 400,
      message: 'new refresh Token generated',
      success: true,
      data: accessToken
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthenticationService.changePassword(req);
    // console.log(result);

    sendResponse(res, {
      statusCode: 400,
      message: 'change password successfully',
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const AuthenticationController = { loginUser, refreshToken, changePassword };
