import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {   FaUser, FaCalendarDay, FaAddressBook, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";  
import "bootstrap/dist/css/bootstrap.min.css";

const ClientSidebar = () => {
  return (
    <Container fluid className="p-3">
      <Row className="d-flex">
        <Col xs={3} className="p-3">
          <div className="d-flex flex-column align-items-start">
        
            <Link to={'/home'} className=" d-flex align-items-center mb-3 custom-link-sb">
              <FaStar size={30} className="me-2" />
              <div>Home</div>
            </Link>

          
            <Link to={'/clients'} className=" d-flex align-items-center mb-3 custom-link-sb">
              <FaAddressBook size={30} className="me-2" />
              <div>Clients</div>
            </Link>

          
            <Link to={'/resBeautyCenter'} className=" d-flex align-items-center mb-3 custom-link-sb">
              <FaCalendarDay size={30} className="me-2" />
              <div>Reservations</div>
            </Link>

           
            <Link to={'/profileBeautyCenter'} className=" d-flex align-items-center custom-link-sb">
              <FaUser size={30} className="me-2" />
              <div>Profile</div>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientSidebar;
