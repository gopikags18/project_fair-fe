import React, { useContext } from 'react'
import Edit from './Edit';
import { deleteProject } from '../services/allApi';
import { deleteProjectContext } from '../../context/ContextApi';




const View = ({projects}) => {
const {deleteProjectResponse, setDeleteProjectResponse} = useContext(deleteProjectContext)
  
console.log(projects);


   const deleteProj = async(id)=>{

    //passing token for jwtMiddleware


    try {

          let token = sessionStorage.getItem("token")
          if(token)
          {
 let headers = {
  Authorization :`Bearer ${token}`,
  
 }

       let apiResponse = await deleteProject(id,headers)
  if(apiResponse.status==200)
  {
    setDeleteProjectResponse(apiResponse.data)
    alert("Successfully Deleted!!")
  }
  else{
    alert("Failed To Delete!!")
  }
          }
      
     
    } catch (error) {
      console.log(error)
    }
   }
   
  return (
    <>
    <div>
      {
        projects?projects.map((eachProject)=>(

            <div className="d-flex justify-content-between border rounded">

      <h1>{eachProject.title}</h1>
      <div className='mt-1'>
       {/* edit button */}
    <Edit project = {eachProject}/>     

      <a target='_blank' href={eachProject.gitLink} className='btn fs-5'><i className="fa-brands fa-github"></i></a>

      <button onClick={()=>deleteProj(eachProject._id)} className='btn text-danger fs-5'><i className="fa-solid fa-trash"></i></button>
      </div>
     </div>


        )): <div className='text-center text-danger'>No Projects found</div>
      }

   
    </div>
    
    </>
  )
}

export default View