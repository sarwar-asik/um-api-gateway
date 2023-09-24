import { Request } from "express";
import { IGenericResponse } from "../../../interfaces/common";
import { AuthService } from "../../../shared/axios";

const loginUser = async(req:Request):Promise<IGenericResponse>=>{
    const response:IGenericResponse =   await AuthService.post("/auth/login",req.body);


    return response
}


export const AuthenticationService = {loginUser}