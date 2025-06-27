import React, { useContext, useState } from "react";
import login1 from "../assets/login.png";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/allApi";
import { loginContext } from "../../context/LoginContext";

const Auth = ({ insideRegister }) => {
  const {isloggedIn, setLoggedIn} = useContext(loginContext)
  const navigate = useNavigate()

  const [userData,setUserData] = useState({
    userName :"",
    email:"",
    password:""
  })

  const [loading,setLoading] = useState(false)

const register = async () =>{    //button call
if(userData.email&& userData.password && userData.userName){                       //check if forms are filled

  try{
  let apiResult = await registerUser(userData)
  console.log(apiResult)  
  //check success
  if(apiResult.status==201)
  {
    
    alert("Successfully created new user")
  }
  else{
    alert("Something went wrong, please contact admin")
  }


} 

catch(error)
{
  console.error(error);
}
}
else{
  alert("Please fill the form")
}
}

const login = async()=>{
  if(userData.email&&userData.password)
  {
     try{
      setLoading(true)
      let payload = {                     //create an object
   
        email: userData.email,
        password: userData.password
      }

      let apiResult = await loginUser(payload)
      console.log(apiResult)
      if(apiResult.status==200)
      {

        //sending token and username to session storage for storing even after the browser is closed.

        sessionStorage.setItem("token",apiResult.data.token)


        sessionStorage.setItem("user",apiResult.data.userName)
        setLoggedIn(true);
        alert("Login successful!!")
        navigate('/')
      }else{
        alert("Invalid credentials!")
      }
        setLoading(false)
     }catch(error)
     {
      console.log(error)
     }
  }
  else{
    alert("Please fill the form");
  }
}

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container card p-3">
        <div className="row">
          <div className="col-lg-6">
            <img className="img-fluid w-75 m-4" src={login1} alt="" />
          </div>

          <div className="col-lg-6 mt-4">
            <h1>
              {" "}
              <i className="fa-brands fa-docker"></i> Project Fair
            </h1>

            <h5>Sign {insideRegister ? "up" : "in"} to your account</h5>
            <Form>
              {insideRegister ? (
                <FloatingLabel
                  controlId="floatingInput"
                  label="UserName"
                  className="mb-3"
                >
                  <Form.Control onChange={(e)=>setUserData({...userData,userName: e.target.value})} type="text" placeholder="Username" />
                </FloatingLabel>
              ) : (
                " "
              )}
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control onChange={(e)=>setUserData({...userData,email:e.target.value})} type="email" placeholder="name@example.com" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control  onChange={(e)=>setUserData({...userData,password:e.target.value})}
                  type="password"
                  placeholder="Enter your password"
                />
              </FloatingLabel>
            </Form>

            {/* if it is on new register page then show the register button */}

            {insideRegister ? (
              <div>
                <button onClick={register} className="btn btn-primary mt-3">Register</button>{" "}
                <p className="mt-2">
                  Existing User? Please Click Here To{" "}
                  <Link to={"/login"}>Login</Link>{" "}
                </p>
              </div>
            ) : (
              <div>
                <button onClick={login} className="btn btn-primary mt-3">Login{loading?<Spinner animation="grow" />:""}</button>
                <p className="mt-2">
                  New User? Please Click Here To{" "}
                  <Link to={"/register"}>Register</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
