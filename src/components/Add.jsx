import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import imageadd from '../assets/imageadd.png'
import { createProject } from '../services/allApi';
import { addProjectContext } from '../../context/ContextApi';

const Add = () => {
 const {addProjectResponse,setAddProjectResponse} = useContext(addProjectContext)

  const [show, setShow] = useState(false);
   const [validImage, setValidImage] = useState(false)

   //image preview state
   const[previewURL,setPreviewURL] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  //creating a new state for storing the form data

  const [projectData, setProjectData] = useState({
    title: "",
    language: "",
    overview: "",
    gitLink: "",
    liveLink: "",
    projectImg: ""
  })

  //create an useEffect for the image on side effect changes

  useEffect(()=>{
    //specifying the image extenstions allowed
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

  const onAddClick= async()=>{
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

              if(token)
              {
                let headers = {
                  "Content-Type":"multipart/form-data",
                  "Authorization":`Bearer ${token}`
                }

                let apiResponse = await createProject(headers,requestBody)
                if(apiResponse.status==201)
                {
                  setAddProjectResponse(apiResponse.data);
                  alert("Successfully Created New Project!")
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

    <button onClick={handleShow} className='btn btn-primary'><i className='fa-solid fa-plus'></i> New Project</button>


   <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
        <Modal.Title>New Project Details!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className='row align-items-center'>

          <div className='col-lg-5'>
            <label>
           <input onChange={(e)=>setProjectData({...projectData,projectImg:e.target.files[0]})} style={{display:"none"}} type="file"  />
<img className='img-fluid' src={previewURL?previewURL:imageadd} alt="" />
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
                <Form.Control onChange={(e)=>setProjectData({...projectData,title:e.target.value})} type="text" placeholder="Project Title" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput" label="Project Languages" className="mb-3">
                <Form.Control onChange={(e)=>setProjectData({...projectData,language:e.target.value})}
                  type="text"
                  placeholder="Project Languages"
                />
              </FloatingLabel>
               <FloatingLabel controlId="floatingInput" label="Project Overview" className="mb-3">
                <Form.Control  onChange={(e)=>setProjectData({...projectData,overview:e.target.value})}
                  type="text"
                  placeholder="Project Overview"
                />
              </FloatingLabel>
               <FloatingLabel controlId="floatingInput" label="Project Github Link"className="mb-3">
                <Form.Control  onChange={(e)=>setProjectData({...projectData,gitLink:e.target.value})}
                  type="text"
                  placeholder="Project Github Link"
                />
              </FloatingLabel>
               <FloatingLabel controlId="floatingInput" label="Project Live Link" className="mb-3">
                <Form.Control  onChange={(e)=>setProjectData({...projectData,liveLink:e.target.value})}
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
          <Button disabled={!validImage} onClick={onAddClick} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal> 
    
    
    
    </>
  )
}

export default Add