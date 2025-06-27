import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import {baseURL} from '../services/serverURL'

const ProjectCard = ({eachproject}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card onClick={handleShow} style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`${baseURL}/uploads/${eachproject.projectImg}`}
        />
        <Card.Body>
          <Card.Title className="text-center">{eachproject.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="col-lg-5">
              <img className="img-fluid" src={`${baseURL}/uploads/${eachproject.projectImg}`} alt="" />
            </div>

            <div className="col-lg-6">
              <h2>{eachproject.title}</h2>

              <h3>
                Languages Used: <span className="text-warning">{eachproject.language}</span>
              </h3>

              <p>
                Project Overview: <span> {eachproject.overview}</span>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="me-auto fs-4 ">
         
            <a style={{textDecoration:"none"}} href={eachproject.gitLink}></a>
            <i className="fa-brands fa-github"></i>
         
         
            <a className="ms-3" style={{textDecoration:"none"}} href={eachproject.liveLink}></a>
            <i className="fa-solid fa-link"></i>
         
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectCard;
