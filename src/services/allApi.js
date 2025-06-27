import commonApi from "./commonApi";


export const registerUser = async(reqBody)=>{
    return await commonApi('post','/register',reqBody);
}

export const loginUser = async(reqBody)=>{
    return await commonApi('post','/login',reqBody);
}
 //custom api
export const createProject = async(reqHeader,reqBody)=>{
    return await commonApi('post','/addProject',reqBody,reqHeader)
}

//get method

export const getLimitedProjects = async()=>{
    return await commonApi('get','/getLimitedProjects',"")
}

export const getAllProjects = async(reqHeader,searchKey)=>{             //token is needed
    return await commonApi('get',`/getAllProjects?search=${searchKey}`,"",reqHeader)  //searchkey is passed as query
}

export const getUserProjects = async(reqHeader)=>{
    return await commonApi('get','/getUserProjects',"",reqHeader)
}

export const editProject = async(reqHeader,reqBody,id)=>{
    return await commonApi('put',`/editProject/${id}`,reqBody,reqHeader)
}

export const deleteProject = async(id,reqHeader)=>{
    return await commonApi('delete', `/deleteProject/${id}`,{},reqHeader)  //reqBody of delete should be passed as an object
}

export const editProfile = async(reqBody,reqHeader)=>{
    return await commonApi ('patch','/editProfile', reqBody,reqHeader)
}