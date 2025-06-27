import axios from "axios";
import { baseURL } from "./serverURL";

const commonApi = async(httpMethod,endPoint,requestBody,reqHeader)=>{
    const requestConfig = {
        method: httpMethod,
        url: baseURL + endPoint,
        data: requestBody,
        headers: reqHeader?reqHeader:{"Content-Type":"application/json"}//multimedia :reqHeader else application/json
    }

    console.log(requestConfig)
    return await axios(requestConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}

export default commonApi 