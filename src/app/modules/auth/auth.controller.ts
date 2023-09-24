import { NextFunction ,Request,Response} from 'express';
import { AuthenticationService } from './auth.service';
import sendResponse from '../../../shared/response';
const loginUser = async(req:Request,res:Response,next:NextFunction)=>{
    try {
    const result = await AuthenticationService.loginUser(req)
  
    sendResponse(res,result)
    } catch (error) {
        next(error)
    }
}


export const AuthenticationController ={loginUser}