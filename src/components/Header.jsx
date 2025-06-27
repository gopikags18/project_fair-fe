import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/LoginContext";

const Header = ({ insideDashboard }) => {
  const {isloggedIn, setLoggedIn} = useContext(loginContext)

  //redirect to home :useNavigate hook
  const navigate = useNavigate();
  const onLogoutClick=()=>{
    sessionStorage.clear() // to clear the data on sessionstorage
   setLoggedIn(false)
    navigate("/")
  }
  return (
    <>
      <Navbar className="position-sticky top-0 bg-body-transparent border shadow">
        <Container>
          <div>
            <Navbar.Brand href="/" className="text-light fs-3 fw-bold">
              <i className="fa-brands fa-docker"></i>
              Project Fair
            </Navbar.Brand>
          </div>

          {insideDashboard ? (
            <button onClick={onLogoutClick} className="btn btn-link fw-bold fs-5">{" "}
              Logout<i className="fa-solid fa-right-to-bracket"></i>{" "}
            </button>
          ) : (
            " "
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
