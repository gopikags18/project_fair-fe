import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
<div className='container-fluid mt-5 w-100 bg-primary' style={{ overflowX: "hidden" }}>

  <div className="row gx-5 mt-3 gap-4 ms-5">

    <div className="col-lg-2 ms-4">
      <Link style={{ textDecoration: "none", color: "cyan", fontSize: "23px" }} to={'/'}>
        <i className="fa-brands fa-docker"></i>Project Fair
      </Link> <br />
      {/* <p className='mt-3' style={{ color: "white" }}>
        Designed and built with all the love in the world by the Luminar team with the help of our Contributors
      </p> <br /> */}
      <p style={{ color: "white" }}>Code licensed Luminar, docs CC BY 3.0</p> <br />
      <p style={{ color: "white" }}>Currently V5.3.2.0</p>
    </div>

    <div className="col-lg-2 ms-4">
      <h4 style={{ color: "white" }}>Links</h4>
      <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>Dashboard Page</Link> <br />
      <Link style={{ textDecoration: "none", lineHeight: "2", color: "white" }} to={"/home"}>Home Page</Link> <br />
      <Link style={{ textDecoration: "none", lineHeight: "2", color: "white" }} to={"/projects"}>Projects Page</Link>
    </div>

    <div className="col-lg-2 ms-4" style={{ lineHeight: 1 }}>
      <h4 style={{ color: "white" }}>Guides</h4>
      <p style={{ color: "white" }}>React</p>
      <p style={{ color: "white" }}>React Router</p>
      <p style={{ color: "white" }}>React Bootstrap</p>
    </div>

    <div className="col-lg-3 ms-4">
      <h4 style={{ color: 'white' }}>Contact</h4>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="email"
          placeholder="Enter Your Email"
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            color: "white",
            backgroundColor: "white"
          }}
        />
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "transparent",
            border: "1px solid cyan",
            color: "white",
            borderRadius: "4px"
          }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="d-flex mt-3 gap-4" style={{ color: "white", fontSize: "18px" }}>
        <i className="fa-brands fa-x-twitter"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-linkedin"></i>
        <i className="fa-brands fa-github"></i>
        <i className="fa-solid fa-phone"></i>
      </div>
    </div>

  </div>

</div>


   
  )
}

export default Footer