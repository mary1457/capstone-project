import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaHome, FaHeart, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";  
import "bootstrap/dist/css/bootstrap.min.css";

const ClientSidebar = () => {
  return (
    <Container fluid className="p-3">
      <Row className="d-flex">
        <Col xs={3} className="p-3">
          <div className="d-flex flex-column align-items-start">
        
            <Link to={'/'} className="text-white d-flex align-items-center mb-3">
              <FaHome size={30} className="me-2" />
              <div>Home</div>
            </Link>

          
            <Link to={'/fav'} className="text-white d-flex align-items-center mb-3">
              <FaHeart size={30} className="me-2" />
              <div>Favorites</div>
            </Link>

          
            <Link to={'/res'} className="text-white d-flex align-items-center mb-3">
              <FaCalendarAlt size={30} className="me-2" />
              <div>Reservations</div>
            </Link>

           
            <Link to={'/profile'} className="text-white d-flex align-items-center">
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
