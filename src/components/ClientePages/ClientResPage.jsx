import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrenotazioni, deletePrenotazioni, resetAll } from '../../redux/actions/prenotazioniActions';
import { useNavigate } from 'react-router-dom';

const ClientResPage = () => {
  const dispatch = useDispatch();
  const prenotazioni = useSelector((state) => state.prenotazioni.prenotazioni);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const error = useSelector((state) => state.prenotazioni.error); // Access error state
  const [loading, setLoading] = useState(true); // State to manage loading status
  const navigate = useNavigate();

  // Fetch the reservations when the component mounts
  useEffect(() => {
    if (accessToken) {
      dispatch(getPrenotazioni(accessToken));
    }
  }, [dispatch, accessToken]);

  // After dispatching actions, update the loading state
  useEffect(() => {
    if (prenotazioni.length > 0 || error) {
      setLoading(false); // Stop loading when data is fetched or error occurs
    }
  }, [prenotazioni, error]);

  const handleDelete = (id) => {
    setLoading(true); // Start loading when deleting a reservation
    dispatch(deletePrenotazioni(accessToken, id));
  };

  const handleCloseError = () => {
    dispatch(resetAll()); 
  };

  useEffect(() => {
    return () => {
      dispatch(resetAll()); 
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
                <Card style={{ width: '100%' }}>
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
