import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import illustration from "../assets/web2.png";
import avatar2 from "../assets/avatar3.png";
import ProjectCard from "../components/ProjectCard";
import { getLimitedProjects } from "../services/allApi";

const Home = () => {

  const[projectData, setProjectData] = useState([])

  useEffect(()=>{
  getProjects()
  },[])

  const navigate = useNavigate()

  const onProjectClick =()=>{
    if(sessionStorage.getItem("token"))
    {
    navigate("/projects")
    }
    else{
      alert("Please Login!!")
    }
  }

  //get limited projects
const getProjects = async()=>{
  try {

    let apiResult = await getLimitedProjects();
    if(apiResult.status==200)
    {
      setProjectData(apiResult.data)
    }
    else{
      alert("Please Login")
    }
    
  } catch (error) {
    console.error(error)
    
  }
}

  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="container-fluid d-flex justify-content-center align-items-center shadow rounded"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: "80px" }}>
                {" "}
                <i className="fa-brands fa-docker"></i> Project Fair
              </h1>
              <p style={{ textAlign: "center" }}>
                One Stop Destination for all Software Development Projects.
                Where User can add and manage their projects. As well as access
                all projects available in our website... What are you waiting
                for!!!
              </p>

              {
                sessionStorage.getItem("token")?(<Link className="btn btn-warning fs-4 fw-bold" to={"/dashboard"}>
                Manage Your Projects
              </Link>
                ):(
              <Link className="btn btn-warning fs-4 fw-bold" to={"/login"}>
                Start To Explore
              </Link>
                )}
            </div>
            

            <div className="col-lg-6">
              <img
                className="img-fluid"
                style={{ height: "500px", width: "600px", textAlign: "center" }}
                src={illustration}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h1 className="mb-3">Explore Our Projects!</h1>

        <marquee>
  <div className="d-flex gap-5"> 

    {
            projectData? projectData.map((eachproject)=>(
             <ProjectCard eachproject={eachproject} />
   
            )):" "
          }
    </div>
          
          
        </marquee>
        <button onClick={onProjectClick} className="btn btn-link fs-5">
          Click Here To View More Projects
        </button>
      </div>

      <div className="text-center mt-5">
        <h1 className="mb-3"> Our Testimonials</h1>

        <div className="d-flex justify-content-around align-items-center">
          <div className="card text-center" style={{ width: "16rem" }}>
            <img src={avatar2} alt="" />
            <div>
              {" "}
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
            </div>
            <p>content</p>
          </div>

          <div className="card text-center" style={{ width: "16rem" }}>
            <img src={avatar2} alt="" />
            <div>
              {" "}
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
            </div>
            <p>
            content 
            </p>
          </div>

          <div className="card text-center" style={{ width: "16rem" }}>
            <img src={avatar2} alt="" />
            <div>
              {" "}
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
              <i
                className="fa-solid fa-star"
                style={{ color: "goldenrod" }}
              ></i>
            </div>
            <p>content</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
