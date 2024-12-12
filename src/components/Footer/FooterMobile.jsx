import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {  FaHeart, FaCalendarAlt, FaUser, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterMobile = () => {
  return (
   
    <Container 
  fluid 
  className="bg-dark text-white p-1 d-block d-lg-none " 
 
>
      <Row className="d-flex justify-content-between text-center">
        <Col xs={3} md={2} className="text-center">
          <Link to={'/home'} className="custom-link-ft">
            <FaStar size={30} className="mb-2"/>
            <div>Home</div>
          </Link>
        </Col>
        <Col xs={3} md={2} className="text-center">
          <Link to={'/fav'} className="custom-link-ft">
            <FaHeart size={30} className="mb-2" />
            <div>Favorites</div>
          </Link>
        </Col>
        <Col xs={3} md={2} className="text-center">
          <Link to={'/res'} className="custom-link-ft">
            <FaCalendarAlt size={30} className="mb-2"/>
            <div>Res</div>
          </Link>
        </Col>
        <Col xs={3} md={2} className="text-center">
          <Link to={'/profile'} className="custom-link-ft">
            <FaUser size={30} className="mb-2"/>
            <div>Profile</div>
          </Link>
        </Col>
      </Row>
    </Container>
   
  );
};

export default FooterMobile;
