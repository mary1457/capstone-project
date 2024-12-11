import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrenotazioni, deletePrenotazioni, resetError } from '../../redux/actions/prenotazioniActions';
import { useNavigate } from 'react-router-dom';

const ClientResPage = () => {
  const dispatch = useDispatch();
  const prenotazioni = useSelector((state) => state.prenotazioni.prenotazioni);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const error = useSelector((state) => state.prenotazioni.error); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  
  useEffect(() => {
    if (accessToken) {
      dispatch(getPrenotazioni(accessToken));
    }
  }, [dispatch, accessToken]);

  
  useEffect(() => {
    if (error) {
      setLoading(false); 
    } else if (prenotazioni.length > 0) {
      setLoading(false); 
    }
  }, [prenotazioni, error]); 

  
  const handleDelete = (id) => {
    setLoading(true); 
    dispatch(deletePrenotazioni(accessToken, id));
  };

 
  const handleCloseError = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    return () => {
      dispatch(resetError()); 
    };
  }, [dispatch]);

  
  const sortedPrenotazioni = prenotazioni
    ? [...prenotazioni].sort((a, b) => new Date(b.data) - new Date(a.data))
    : [];

 
  const isFutureReservation = (date) => new Date(date) >= new Date();

  return (
    <Container fluid className="p-4">
   
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong>
        </Alert>
      )}

    
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        <Row className="g-4">
       
          {sortedPrenotazioni && sortedPrenotazioni.length > 0 ? (
            sortedPrenotazioni.map((res) => (
              <Col xs={12} key={res.id}>
                <Card style={{ width: '100%' }} className='custom-card'>
                  <Card.Body>
                    <Card.Title>{res.centroEstetico.trattamento.replace(/_/g, ' ')}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new Date(res.data).toLocaleString()}
                    </Card.Subtitle>
                    <Card.Text className="mb-0">
                      {res.centroEstetico.nomeCentroEstetico}
                    </Card.Text>
                    <Card.Text>
                      {res.centroEstetico.indirizzo}, {res.centroEstetico.citta}
                    </Card.Text>

                  
                    {isFutureReservation(res.data) && (
                      <div className="d-flex justify-content-end mt-2">
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(res.id)}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
             
              <p>No reservations found</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ClientResPage;
