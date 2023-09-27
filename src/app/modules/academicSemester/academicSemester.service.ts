import { IGenericResponse } from '../../../interfaces/common';
import { CoreService as HttpService } from '../../../shared/axios';
import { Request } from 'express';

const insertToDb = async (req: Request): Promise<IGenericResponse> => {
  console.log('🚀 ~ file: academicSemester.service.ts:4 ~ insertToDb ~ req:', req.body);

  const response: IGenericResponse = await HttpService.post('/academic-semesters', req.body, {
    headers: {
      Authorization: req.headers.authorization
    }
  });

  return response;
};

const getAllFromDb = async (req: Request): Promise<IGenericResponse> => {
  console.log(req.query);

  const response: IGenericResponse = await HttpService.get('/academic-semesters', {
    params: req?.query,
    headers: {
      Authorization: req.headers.authorization
    }
  });

  return response;
};

const getSingleFromDb = async (req: Request): Promise<IGenericResponse> => {
  console.log(req.params);

  const response: IGenericResponse = await HttpService.get(`/academic-semesters/${req.params?.id}`, {
    params: req?.params,
    headers: {
      Authorization: req.headers.authorization
    }
  });

  return response;
};

const updateOneDb = async (req: Request): Promise<IGenericResponse> => {
    // console.log(req.params);
  
    const response: IGenericResponse = await HttpService.patch(`/academic-semesters/${req.params?.id}`,req.body, {
      params: req?.params,
      headers: {
        Authorization: req.headers.authorization
      }
    });
  
    return response;
  };
  

  const deleteFromDb = async (req: Request): Promise<IGenericResponse> => {
    console.log(req.params);
  
    const response: IGenericResponse = await HttpService.delete(`/academic-semesters/${req.params?.id}`, {
      params: req?.params,
      headers: {
        Authorization: req.headers.authorization
      }
    });
  
    return response;
  };
  

export const AcademicSemesterService = {
  insertToDb,
  getAllFromDb,
  getSingleFromDb,
  updateOneDb,
  deleteFromDb
};
