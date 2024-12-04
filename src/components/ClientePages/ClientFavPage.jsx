import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  deletePreferiti,
  getPreferiti,
  resetError,
} from '../../redux/actions/preferitiActions';

const ClientFavPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const preferiti = useSelector((state) => state.preferiti.preferiti);
  const error = useSelector((state) => state.preferiti.error); // Stato dell'errore
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento

  // Eseguiamo la chiamata per recuperare i preferiti quando il componente viene montato
  useEffect(() => {
    if (accessToken) {
      dispatch(getPreferiti(accessToken));
    }
  }, [dispatch, accessToken]);

  // Gestiamo lo stato di caricamento basato sul risultato della chiamata asincrona
  useEffect(() => {
    // Se la lista preferiti è vuota e non ci sono errori, fermiamo il caricamento
    if (preferiti.length > 0 || error) {
      setLoading(false);
    }
  }, [preferiti, error]); // Dipende dai preferiti e dall'errore

  // Funzione per rimuovere un centro estetico dai preferiti
  const handleRemoveFromFavorites = (id) => {
    setLoading(true); // Iniziamo il caricamento quando si rimuove un preferito
    dispatch(deletePreferiti(accessToken, id));
  };

  // Funzione per chiudere il messaggio di errore
  const handleCloseError = () => {
    dispatch(resetError());
  };

  // Puliamo lo stato dell'errore quando il componente viene smontato
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-4">
      {/* Mostriamo un messaggio di errore, se presente */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong>
        </Alert>
      )}

      {/* Mostriamo lo spinner di caricamento se i dati sono in fase di recupero */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        <Row className="g-4">
          {/* Se ci sono preferiti, li mostriamo, altrimenti mostriamo un messaggio che non ci sono preferiti */}
          {preferiti && preferiti.length > 0 ? (
            preferiti.map((fav) => (
              <Col xs={12} md={6} xl={4} key={fav.id}>
                <Card className="mb-3" style={{ maxWidth: '100%' }}>
                  <div
                    className="d-flex justify-content-end position-absolute p-2"
                    style={{ top: '0', right: '0' }}
                  >
                    <FaHeart
                      size={24}
                      color="red"
                      onClick={() => handleRemoveFromFavorites(fav.id)}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{fav.centroEstetico.nomeCentroEstetico}</Card.Title>
                    <Card.Text className="mb-0">{fav.centroEstetico.indirizzo}</Card.Text>
                    <Card.Text>{fav.centroEstetico.citta}</Card.Text>
                    <Card.Text>
                      <small className="text-muted">{fav.centroEstetico.email}</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              {/* Messaggio nel caso non ci siano preferiti */}
              <p>No favorites found</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ClientFavPage;
