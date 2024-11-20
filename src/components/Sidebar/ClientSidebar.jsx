import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaHome, FaHeart, FaCalendarAlt, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function ClientSidebar() {
  return (
    <Container fluid className="p-3">
      <Row className="d-flex">
        <Col xs={3} className="p-3">
          <div className="d-flex flex-column align-items-start">
            {/* Home Icon */}
            <Nav.Link href="#" className="text-white d-flex align-items-center mb-3">
              <FaHome size={30} className="me-2 text-white" />
              <div>Home</div>
            </Nav.Link>

            {/* Favorites Icon */}
            <Nav.Link href="#" className="text-white d-flex align-items-center mb-3">
              <FaHeart size={30} className="me-2 text-white" />
              <div>Favorites</div>
            </Nav.Link>

            {/* Reservations Icon */}
            <Nav.Link href="#" className="text-white d-flex align-items-center mb-3">
              <FaCalendarAlt size={30} className="me-2 text-white" />
              <div>Reservations</div>
            </Nav.Link>

            {/* Profile Icon */}
            <Nav.Link href="#" className="text-white d-flex align-items-center">
              <FaUser size={30} className="me-2 text-white" />
              <div>Profile</div>
            </Nav.Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientSidebar;
