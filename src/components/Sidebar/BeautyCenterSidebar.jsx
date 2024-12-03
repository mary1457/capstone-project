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
        
            <Link to={'/home'} className="text-white d-flex align-items-center mb-3">
              <FaStar size={30} className="me-2" />
              <div>Home</div>
            </Link>

          
            <Link to={'/clients'} className="text-white d-flex align-items-center mb-3">
              <FaAddressBook size={30} className="me-2" />
              <div>Clients</div>
            </Link>

          
            <Link to={'/resBeautyCenter'} className="text-white d-flex align-items-center mb-3">
              <FaCalendarDay size={30} className="me-2" />
              <div>Reservations</div>
            </Link>

           
            <Link to={'/profileBeautyCenter'} className="text-white d-flex align-items-center">
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