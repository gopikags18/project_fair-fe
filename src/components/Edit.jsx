import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { baseURL } from '../services/serverURL'
import { editProject } from '../services/allApi'
import { editProjectContext } from '../../context/ContextApi'

useState

const Edit = ({project}) => {
console.log(project)
 const {editProjectResponse, setEditProjectResponse} = useContext(editProjectContext)

  const [show, setShow] = useState(false);
  const [validImage, setValidImage] = useState(false)


  const[previewURL,setPreviewURL] = useState("")
  const imagePlace = `${baseURL}/uploads/${project.projectImg}`
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

    const [projectData, setProjectData] = useState({
      title: "",
      language: "",
      overview: "",
      gitLink: "",
      liveLink: "",
      projectImg: ""
    })

    //change only on loading
    useEffect(()=>{
   setProjectData(project)
    },[])
  //sending project to projectdata for editing
  useEffect(()=>
  {

     if(projectData.projectImg.type=="image/png"||projectData.projectImg.type=="image/jpeg"||projectData.projectImg.type=="image/jpg")

        {
          //valid image , set a flag
          setValidImage(true)
          //preview image URL

          setPreviewURL(URL.createObjectURL(projectData.projectImg))
        }
        else{
          //invalid image
          setValidImage(false)
        }
    
  },[projectData.projectImg])


const onEditClick = async()=>{
   if(projectData.title && projectData.language && projectData.overview && projectData.gitLink && projectData.liveLink && projectData.projectImg)
     {
              // specify the condition
  
              try {
                const requestBody = new FormData();  //to add multimedia content using formdata
  
                requestBody.append("title",projectData.title)
                requestBody.append("language",projectData.language)
                requestBody.append("overview",projectData.overview)
                requestBody.append("gitLink",projectData.gitLink)
                requestBody.append("liveLink",projectData.liveLink)
                requestBody.append("projectImg",projectData.projectImg)
  
  
                const token = sessionStorage.getItem("token")
                //we need id to pass the object for edit

                let pId = project._id;
  
                if(token)
                {
                  let headers = {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                  }
  
                  let apiResponse = await editProject(headers,requestBody,pId)
                  if(apiResponse.status==200)
                  {
                    setEditProjectResponse(apiResponse.data)
                    alert("Successfully Edited Project!")
                    handleClose()
                  }
                  else{
                    alert("Something Went Wrong, Please Contact Admin");
                  }
                }
                
              } catch (error) {
                console.log(error)
              }
     }
     else
     {
      alert("Please Fill The Form!!")
     }
}
  
  return (
    <>
     <button onClick={handleShow} className='btn fs-5' ><i className="fa-solid fa-pen-to-square"></i></button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
        <Modal.Title>Edit Project Details!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row align-items-center'>

          <div className='col-lg-5'>
            <label>
           <input onChange={(e)=>setProjectData({...projectData,projectImg:e.target.files[0]})} style={{display:"none"}} type="file"  />
<img className='img-fluid' 
src={previewURL?previewURL:imagePlace} 
alt="" />
</label>

{
  !validImage? <p className='text-warning mt-2 fs-5 fw-bold'>Upload Only The Following File Types (jpeg, jpg, png) Here!! </p>: ""
}


          </div>


          <div className='col-lg-6'>
          <Form>
             <FloatingLabel
                controlId="floatingInput"
               
                label="Project Title"
                className="mb-3"
              >
                <Form.Control onChange={(e)=>setProjectData({...projectData,title:e.target.value})}
                 value={projectData?.title||""}
                  type="text" placeholder="Project Title" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput" label="Project Languages" className="mb-3">
                <Form.Control onChange={(e)=>setProjectData({...projectData,language:e.target.value})}
                 value={projectData?.language||""}
                  type="text"
                  placeholder="Project Languages"
                />
              </FloatingLabel>
               <FloatingLabel controlId="floatingInput" label="Project Overview" className="mb-3">
                <Form.Control  onChange={(e)=>setProjectData({...projectData,overview:e.target.value})}
                  value={projectData?.overview||""} type="text"
                  placeholder="Project Overview"
                />
              </FloatingLabel>
               <FloatingLabel controlId="floatingInput" label="Project Github Link"className="mb-3">
                <Form.Control  onChange={(e)=>setProjectData({...projectData,gitLink:e.target.value})}
                    value={projectData?.gitLink||""}
                   type="text"
                  placeholder="Project Github Link"
                />
              </FloatingLabel>
               <FloatingLabel controlId="floatingInput" label="Project Live Link" className="mb-3">
                <Form.Control  onChange={(e)=>setProjectData({...projectData,liveLink:e.target.value})}
                 value={projectData?.liveLink||""}
                  type="text"
                  placeholder="Project Live Link"
                />
              </FloatingLabel>
            </Form>


          </div>


         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={onEditClick} variant="primary">Edit</Button>
        </Modal.Footer>
      </Modal> 
    
    
    </>
  )
}

export default Edit