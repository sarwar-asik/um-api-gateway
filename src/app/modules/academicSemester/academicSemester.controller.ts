import { Request, Response, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';

const insertIntoDb = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const result = await AcademicSemesterService.insertToDb(req)

        sendResponse<any>(res,{
            success:true,
            statusCode:httpStatus.CREATED,
            data:result
        } )

    }catch(error){
        console.log(error);
    }
};


export const AcademicSemesterController ={
    insertIntoDb
}
