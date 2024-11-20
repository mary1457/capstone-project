import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

const ClientFavPage = () => {
  return (
    <Container fluid className="p-4">
      {/* Cards Section */}
      <Row className="g-4">
        {/* Card 1 */}
        <Col xs={12} md={6} xl={4}>
        <Card className="mb-3" style={{ maxWidth: '100%' }}>
      {/* Heart icon in the top right corner */}
      <div className="d-flex justify-content-end position-absolute p-2" style={{ top: '0', right: '0' }}>
        <FaHeart size={24} className="text-danger" />
      </div>
      <div className="row g-0">
        {/* Image Section */}
        <div className="col-12 col-lg-= d-block d-lg-none">
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
        </div>

        {/* Card Content Section */}
        <div className="col-12 ">
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </Card.Text>
            <Card.Text>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Text>
          </Card.Body>
        </div>
      </div>
    </Card>
        </Col>

        {/* Card 2 */}
        <Col xs={12} md={6} xl={4}>
          <Card className="text-bg-dark">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Card+2" alt="Card 2" />
            <Card.ImgOverlay>
              <Card.Title>Card Title 2</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col xs={12} md={6} xl={4}>
          <Card className="text-bg-dark">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Card+3" alt="Card 3" />
            <Card.ImgOverlay>
              <Card.Title>Card Title 3</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 4 */}
        <Col xs={12} md={6} xl={4}>
          <Card className="text-bg-dark">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Card+4" alt="Card 4" />
            <Card.ImgOverlay>
              <Card.Title>Card Title 4</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 5 */}
        <Col xs={12} md={6} xl={4}>
          <Card className="text-bg-dark">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Card+5" alt="Card 5" />
            <Card.ImgOverlay>
              <Card.Title>Card Title 5</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 6 */}
        <Col xs={12} md={6} xl={4}>
          <Card className="text-bg-dark">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Card+6" alt="Card 6" />
            <Card.ImgOverlay>
              <Card.Title>Card Title 6</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientFavPage;
