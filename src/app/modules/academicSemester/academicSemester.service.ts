import { CoreService as HttpService } from "../../../shared/axios"

const insertToDb =async(req:any) => {

    console.log("🚀 ~ file: academicSemester.service.ts:4 ~ insertToDb ~ req:", req.body)

    const response  = await HttpService.post('/academic-semester',req.body,{
        headers:{
            Authorization:req.headers.authorization
        }
    })

    return response
}

export  const AcademicSemesterService ={
    insertToDb
}
