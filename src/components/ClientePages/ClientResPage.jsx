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
  const error = useSelector((state) => state.prenotazioni.error); // Stato dell'errore
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const navigate = useNavigate();

  // Recupera le prenotazioni quando il componente viene montato
  useEffect(() => {
    if (accessToken) {
      dispatch(getPrenotazioni(accessToken));
    }
  }, [dispatch, accessToken]);

  // Quando le prenotazioni o l'errore cambiano, aggiorniamo lo stato di caricamento
  useEffect(() => {
    if (error) {
      setLoading(false); // Fermiamo il caricamento se c'è un errore
    } else if (prenotazioni.length > 0) {
      setLoading(false); // Fermiamo il caricamento se ci sono prenotazioni
    }
  }, [prenotazioni, error]); // Dipende dai preferiti e dall'errore

  // Funzione per rimuovere una prenotazione
  const handleDelete = (id) => {
    setLoading(true); // Iniziamo il caricamento quando si rimuove una prenotazione
    dispatch(deletePrenotazioni(accessToken, id));
  };

  // Funzione per chiudere l'errore
  const handleCloseError = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    return () => {
      dispatch(resetError()); // Pulisce l'errore quando il componente viene smontato
    };
  }, [dispatch]);

  // Ordinamento delle prenotazioni in base alla data
  const sortedPrenotazioni = prenotazioni
    ? [...prenotazioni].sort((a, b) => new Date(b.data) - new Date(a.data))
    : [];

  // Funzione per verificare se una prenotazione è futura
  const isFutureReservation = (date) => new Date(date) >= new Date();

  return (
    <Container fluid className="p-4">
      {/* Mostriamo un messaggio di errore se presente */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong>
        </Alert>
      )}

      {/* Mostriamo lo spinner di caricamento se in fase di recupero dati */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        <Row className="g-4">
          {/* Se ci sono prenotazioni, le mostriamo, altrimenti un messaggio che non ci sono prenotazioni */}
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

                    {/* Mostriamo il pulsante di eliminazione solo per le prenotazioni future */}
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
              {/* Messaggio quando non ci sono prenotazioni */}
              <p>No reservations found</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ClientResPage;
