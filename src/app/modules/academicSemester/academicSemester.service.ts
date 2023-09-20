import { CoreService as HttpService } from "../../../shared/axios"

const insertToDb =async(req)=>{
    const response  = await HttpService.post('/')
}