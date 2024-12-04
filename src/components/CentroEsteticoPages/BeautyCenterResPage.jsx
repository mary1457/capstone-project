import React, { useState, useEffect } from 'react'; // Importazione di useState e useEffect
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap'; // Importazione di Alert e Spinner per la gestione degli errori e del caricamento
import { useSelector, useDispatch } from 'react-redux';
import { getToday, resetError } from '../../redux/actions/prenotazioniActions'; // Azioni per recuperare le prenotazioni di oggi

const BeautyCenterResPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken); // Recupera il token di accesso dallo stato globale
  const today = useSelector((state) => state.prenotazioni.today); // Recupera le prenotazioni di oggi dallo stato globale
  const error = useSelector((state) => state.prenotazioni.error); // Stato degli errori dalla sezione prenotazioni
  const [loading, setLoading] = useState(true); // Stato di caricamento per la gestione della richiesta di dati
  
  // Effetto per recuperare le prenotazioni di oggi quando il componente è montato
  useEffect(() => {
    if (accessToken) {
      dispatch(getToday(accessToken)); // Dispatcia l'azione per recuperare le prenotazioni di oggi
    }
  }, [dispatch, accessToken]);

  // Effetto per aggiornare lo stato di caricamento quando i dati sono stati caricati
  useEffect(() => {
    if (today !== undefined) {
      setLoading(false); // Imposta il caricamento su false quando i dati sono stati ricevuti (anche se vuoti)
    }
  }, [today]); // Trigger dell'effetto quando `today` cambia

  // Funzione per gestire la chiusura dell'alert di errore
  const handleCloseError = () => {
    dispatch(resetError()); // Resetta lo stato dell'errore
  };

  // Cleanup: resettare lo stato degli errori quando il componente viene smontato
  useEffect(() => {
    return () => {
      dispatch(resetError()); // Resetta gli errori al termine del ciclo di vita del componente
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-4">
      {/* Mostra un messaggio di errore se c'è un errore */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> {/* Visualizza il messaggio di errore */}
        </Alert>
      )}

      {/* Spinner di caricamento */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" /> {/* Mostra lo spinner finché i dati non sono caricati */}
        </Row>
      ) : (
        // Mostra le prenotazioni di oggi
        <Row className="g-4">
          {today && today.length > 0 ? (
            today.map((res) => (
              <Col xs={12} key={res.id}>
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    {/* Mostra il trattamento con l'underscore sostituito da uno spazio */}
                    <Card.Title>{res.centroEstetico.trattamento.replace(/_/g, " ")}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {/* Formatta la data e ora della prenotazione */}
                      {new Date(res.data).toLocaleString()}
                    </Card.Subtitle>
                    <Card.Text className="mb-0">
                      {/* Mostra il nome del centro estetico */}
                      {res.centroEstetico.nomeCentroEstetico}
                    </Card.Text>

                    <Card.Text>
                      {/* Mostra l'indirizzo e la città del centro estetico */}
                      {res.centroEstetico.indirizzo}, {res.centroEstetico.citta}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p>No reservations found</p> {/* Messaggio da mostrare se non ci sono prenotazioni */}
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default BeautyCenterResPage;
