import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {  FaCalendarAlt, FaUser, FaStar, FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterMobileBC = () => {
  return (
    <Container fluid className="bg-dark text-white p-3 d-block d-lg-none">
      <Row className="d-flex justify-content-between text-center">
        <Col xs={3} md={2} className="text-center">
          <Link to={'/home'} className="text-white">
            <FaStar size={30} />
            <div>Home</div>
          </Link>
        </Col>
        <Col xs={3} md={2} className="text-center">
          <Link to={'/clients'} className="text-white">
            <FaAddressBook size={30} />
            <div>Clients</div>
          </Link>
        </Col>
        <Col xs={3} md={2} className="text-center">
          <Link to={'/resBeautyCenter'} className="text-white">
            <FaCalendarAlt size={30} />
            <div>Reservations</div>
          </Link>
        </Col>
        <Col xs={3} md={2} className="text-center">
          <Link to={'/profileBeautyCenter'} className="text-white">
            <FaUser size={30} />
            <div>Profile</div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterMobileBC;
