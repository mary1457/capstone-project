import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

const ClientResPage = () => {
  return (
    <Container fluid className="p-4">
      {/* Cards Section */}
      <Row className="g-4 d-flex justify-content-center align-items-center">
        {/* Card 1 */}
        <Col xs={12} md={8} lg={6} xl={4}>
        <Card style={{ width: '100%' }}>
  {/* Immagine rotonda */}
  <div className="text-center mt-3">
    <Card.Img
      src="https://via.placeholder.com/100"
      alt="Profile"
      className="rounded-circle"
      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
    />
  </div>

  <Card.Body className='text-center'>
    <Card.Title>Card title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card subtitle</Card.Subtitle>
    

    <div className="d-flex justify-content-center mt-2">
      <Button variant="primary" className="me-2">
        Edit
      </Button>
      <Button variant="danger">
        Delete
      </Button>
    </div>
  </Card.Body>
</Card>

        </Col>

        
      </Row>
    </Container>
  );
};

export default ClientResPage;
