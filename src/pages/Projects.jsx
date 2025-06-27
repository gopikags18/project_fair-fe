import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjects } from '../services/allApi'


const Projects = () => {
 const [projectData ,setProjectData] = useState([])

 //state to store searchkey

 const [searchKey, setSearchKey] = useState([])

 useEffect(()=>{
  getProjects();
 },[searchKey])


  const getProjects = async()=>{
    let token = sessionStorage.getItem("token")
    let header = {
      Authorization : `Bearer ${token}`
    };

    let apiResponse = await getAllProjects(header,searchKey)
    if(apiResponse.status==200)
    {
      setProjectData (apiResponse.data)
      
    }
    else{
      console.log("error")
    }
  }
  return (
    <>
    <Header/>

    <div className='d-flex justify-content-between align-items-center mt-3 my-3 w-100'>

      
        <h2>All Projects</h2>
       

       
          <input onChange={((e)=>setSearchKey(e.target.value))} type="text" className='form-control w-25 p-2' placeholder='Search projects by their language' />
       


    </div>

    <Row>
      {
        projectData? projectData.map((eachproject)=>(
      <Col lg={4} md={6} sm={12}>
   <ProjectCard eachproject={eachproject}/>
      </Col>
        )):""
      }

    </Row>
    
    </>
  )
}

export default Projects