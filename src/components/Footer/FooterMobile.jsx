import React from 'react';
import { Container, Row, Col, Nav,  } from 'react-bootstrap';
import { FaHome, FaHeart, FaCalendarAlt, FaUser } from 'react-icons/fa'; // Importiamo le icone da react-icons
import { Link, useNavigate } from 'react-router-dom'
const Footer = () => {
  return (
    <Container fluid className="bg-dark text-white p-3 d-block d-lg-none ">
      <Row className="d-flex justify-content-between text-center">
        {/* Home Icon */}
        <Col xs={3} md={2} className="text-center">
        <Link to={'/'} className="text-white" >
            <FaHome size={30} />
            <div>Home</div>
            </Link>
        </Col>

        {/* Favorites Icon */}
        <Col xs={3} md={2} className="text-center">
        <Link to={'/fav'} className="text-white" >
         
            <FaHeart size={30} />
            <div>Favorites</div>
          
          </Link>
        </Col>

        {/* Reservations Icon */}
        <Col xs={3} md={2} className="text-center">
        <Link to={'/res'} className="text-white" > 
            <FaCalendarAlt size={30} />
            <div>Reservations</div>
            </Link>
        </Col>

        {/* Profile Icon */}
        <Col xs={3} md={2} className="text-center">
        <Link to={'/profile'} className="text-white" > 
            <FaUser size={30} />
            <div>Profile</div>
            </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;