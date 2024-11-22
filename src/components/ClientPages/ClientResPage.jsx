
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import {getPrenotazioni, deletePrenotazioni } from '../../redux/actions/prenotazioniActions'; 
import { useNavigate } from 'react-router-dom';

const ClientResPage = () => {
    const dispatch = useDispatch();
    const prenotazioni = useSelector((state) => state.prenotazioni.prenotazioni);

  
    const accessToken = useSelector((state) => state.accessToken.accessToken);
    const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(getPrenotazioni(accessToken));
    }, [dispatch, accessToken]);
  
    const handleDelete = (id) => {
      dispatch(deletePrenotazioni(accessToken,id));
    
    };
  
    


  return (
    <Container fluid className="p-4">
      {/* Cards Section */}
      <Row className="g-4">
      {prenotazioni && prenotazioni.length > 0 ? (
          prenotazioni.map((book) => (
        <Col xs={12} md={6} xl={4}>
        <Card style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title>{book.centroEstetico.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card subtitle</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <div className="d-flex justify-content-end mt-2">

  <Button variant="danger"  onClick={() => handleDelete(book.id)}>
    Delete
  </Button>
</div>
          </Card.Body>
        </Card>
        </Col>
  ))
) : (
  <p>No prenotazioni</p> // Messaggio se non ci sono preferiti
)}
      </Row>
    </Container>
  );
};

export default ClientResPage;
