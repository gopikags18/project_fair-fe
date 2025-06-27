import React, { useState } from 'react'
import { Collapse, FloatingLabel, Form } from 'react-bootstrap';
import photoupload from '../assets/photoupload.png'
import { editProfile } from '../services/allApi';

const Profile = () => {

    const [open, setOpen] = useState(false);

    //updating details in profile
const [profileData, setProfileData] = useState({})  //empty curly bracket coz we are not changing all the details, only specific details which are unknown at the moment.
 
const updateProfile = async()=>{
  if(Object.keys(profileData).length>0) {
      try {

        let token = sessionStorage.getItem("token")
        let headers = {
          Authorization: `Bearer ${token}`
        }

        let apiResponse = await editProfile(profileData,headers)
        if(apiResponse.status==200)
        {
          alert("Successfully Updated Profile!!")
        }
        else{
          alert("Something Went Wrong!")
        }
      } catch (error) {
      console.log(error)  
      }
    }
   
}
return (
    <div>
<div className="d-flex justify-content-around">

  <h2 className='text-warning'>Profile</h2>

  
    <button onClick={()=>setOpen(!open)} className='btn text-warning fs-5'>
      <i className="fa-solid fa-angle-down"></i>
    </button>
  



</div>

<Collapse in={open}>
        <div className='card shadow'>

          <div className='text-center p-2'> 
          <label>

            <input onChange={(e)=>setProfileData({...profileData, projectImg:e.target.files[0]})}   style={{display:"none"}} type="file" />

            <img className='img-fluid w-50 text-center' src={photoupload} alt="" />
          </label>

        <Form>
             <FloatingLabel
                controlId="floatingInput"
                label="User Github Link"
                className="mb-3 mt-3"
              >
                <Form.Control onChange={(e)=>setProfileData({...profileData, gitLink:e.target.value})} type="text" placeholder="User GitHub Link" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput" label="User LinkedIn Link" className="mb-3">
                <Form.Control
                onChange={(e)=>setProfileData({...profileData, liveLink:e.target.value})} 
                  type="text"
                  placeholder="User LinkedIn Link"
                />
              </FloatingLabel>
              </Form>

              <button onClick={updateProfile} className='btn btn-warning w-100 fw-bold'>Update</button>



          </div>
         
        </div>
      </Collapse>


    </div>
  )
}

export default Profile