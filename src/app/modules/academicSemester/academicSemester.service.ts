import { IGenericResponse } from "../../../interfaces/common"
import { CoreService as HttpService } from "../../../shared/axios"
import {Request} from "express"

const insertToDb =async(req:Request):Promise<IGenericResponse> => {

    console.log("🚀 ~ file: academicSemester.service.ts:4 ~ insertToDb ~ req:", req.body)

    const response:IGenericResponse  = await HttpService.post('/academic-semester',req.body,{
        headers:{
            Authorization:req.headers.authorization
        }
    })

    return response
}

const getAllFromDb =async(req:Request):Promise<IGenericResponse> => {

    console.log(req.params);



    const response:IGenericResponse  = await HttpService.get('/academic-semester',{
        headers:{
            Authorization:req.headers.authorization
        }
    })

    return response
}

export  const AcademicSemesterService ={
    insertToDb,
    getAllFromDb
}
