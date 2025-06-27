import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Profile'
import Add from '../components/Add'
import { getUserProjects } from '../services/allApi'
import { addProjectContext, deleteProjectContext, editProjectContext } from '../../context/ContextApi'

const Dashboard = () => {

   const {addProjectResponse, setAddProjectResponse} = useContext(addProjectContext)
   const { editProjectResponse, setEditProjectResponse } = useContext(editProjectContext)
   const {deleteProjectResponse, setDeleteProjectResponse} = useContext(deleteProjectContext)

   const [projects ,setProjects] = useState([])

    useEffect(()=>{
     getProjects();
    },[addProjectResponse,editProjectResponse, deleteProjectResponse]);

 const getProjects = async()=>{
  try {
 let token = sessionStorage.getItem('token')
        if(token)
        {
          let headers = {
            Authorization: `Bearer ${token}`
          }

          let apiResponse = await getUserProjects(headers)
          if(apiResponse.status==200)
          {
             setProjects (apiResponse.data)
          }
          else{
            alert("Failed to fetch projects!")
          }
          
        }
  } catch (error) {
    console.error(error)
  }

    }
 

  return (
   <>
   <Header insideDashboard = {true}/>

<div className='row mt-3 w-100 mx-2'>
   <div className='col-lg-8'>
    <h1>Welcome <span className='text-warning'>User</span></h1>

    <div className='d-flex justify-content-evenly align-items-center'>
  <h3>All Projects</h3>
  <Add/>
    </div>

    <div className='text-center'>
      <p > You haven't had any projects yet!!!</p>
      <View projects={projects}/>


    </div>


   </div>


   <div className='col-lg-4'>
<Profile/>

   </div>
   </div>
   </>
  )
}

export default Dashboard