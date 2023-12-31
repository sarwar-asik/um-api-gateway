import { Request, Response, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/response';
import httpStatus from 'http-status';

const insertIntoDb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicSemesterService.insertToDb(req);

    sendResponse<any>(res, result as any);
  } catch (error) {
    console.log(error);
  }
};

const getAllFromDb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicSemesterService.getAllFromDb(req);

    sendResponse<any>(res, result as any);
  } catch (error) {
    console.log(error);
  }
};

const getSingleFromDb = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AcademicSemesterService.getSingleFromDb(req);

    sendResponse<any>(res, result as any);
  } catch (error) {
    console.log(error);
  }
}



const updateOneDb = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AcademicSemesterService.updateOneDb(req);
  
      sendResponse<any>(res, result as any);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFromDb = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AcademicSemesterService.deleteFromDb(req);
  
      sendResponse<any>(res, result as any);
    } catch (error) {
      console.log(error);
    }
  }
  
export const AcademicSemesterController = {
  insertIntoDb,
  getAllFromDb,
  getSingleFromDb,
  updateOneDb,
  deleteFromDb
};
