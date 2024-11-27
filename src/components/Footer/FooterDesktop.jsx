import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterDesktop = () => {
  return (
    <Container fluid className="text-white p-3 d-none d-lg-block">
      <Row className="d-flex justify-content-between align-items-center">
        <Col lg={6} className="text-center mb-4 mb-lg-0">
          <h5 className="mb-3">Follow Us</h5>
          <Nav className="justify-content-center">
            <Nav.Link href="#" className="text-white mx-2">
              <FaFacebook size={30} />
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-2">
              <FaTwitter size={30} />
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-2">
              <FaInstagram size={30} />
            </Nav.Link>
            <Nav.Link href="#" className="text-white mx-2">
              <FaLinkedin size={30} />
            </Nav.Link>
          </Nav>
        </Col>
        <Col lg={6} className="text-center mb-4 mb-lg-0">
          <h5 className="mb-3">Contact</h5>
          <p className="mb-1">Email: support@glowbook.com</p>
          <p className="mb-0">Phone: +123 456 7890</p>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col>
          <p className="mb-0">&copy; {new Date().getFullYear()} GlowBook. All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterDesktop;
