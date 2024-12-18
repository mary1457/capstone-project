import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {  FaHeart, FaCalendarAlt, FaUser, FaStar } from "react-icons/fa";
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

          
            <Link to={'/fav'} className=" d-flex align-items-center mb-3 custom-link-sb">
              <FaHeart size={30} className="me-2" />
              <div>Favorites</div>
            </Link>

          
            <Link to={'/res'} className=" d-flex align-items-center mb-3 custom-link-sb">
              <FaCalendarAlt size={30} className="me-2" />
              <div>Reservations</div>
            </Link>

           
            <Link to={'/profile'} className=" d-flex align-items-center custom-link-sb">
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
