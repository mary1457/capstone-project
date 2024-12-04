import React, { useState, useEffect } from 'react'; // Aggiunto useState per gestire lo stato del componente
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap'; // Aggiunto Alert e Spinner per gestire gli errori e il caricamento
import { useSelector, useDispatch } from 'react-redux';
import { getClienti, resetError } from '../../redux/actions/centroEsteticoActions'; // Azione per recuperare i clienti

const BeautyCenterClientsPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken); // Recupera il token di accesso
  const clients = useSelector((state) => state.centroEstetico.clients); // Recupera la lista dei clienti
  const error = useSelector((state) => state.centroEstetico.error); // Recupera eventuali errori
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento dei dati

  // Recupera i clienti quando il componente viene montato
  useEffect(() => {
    if (accessToken) {
      dispatch(getClienti(accessToken)); // Dispatcia l'azione per recuperare i clienti
    }
  }, [dispatch, accessToken]);

  // Raggruppa i clienti per la lettera iniziale del loro cognome
  const groupClientsByInitial = (clients) => {
    if (!clients || clients.length === 0) return {}; // Se non ci sono clienti, ritorna un oggetto vuoto
    return clients.reduce((acc, client) => {
      const initial = client.cognome.charAt(0).toUpperCase(); // Ottieni la prima lettera del cognome
      if (!acc[initial]) {
        acc[initial] = []; // Crea un nuovo gruppo se non esiste
      }
      acc[initial].push(client); // Aggiungi il cliente al gruppo corrispondente
      return acc;
    }, {});
  };

  // Raggruppa i clienti in base alla lettera iniziale del cognome
  const groupedClients = groupClientsByInitial(clients);

  // Gestisce la chiusura del messaggio di errore
  const handleCloseError = () => {
    dispatch(resetError()); // Reset dell'errore nel Redux store
  };

  // Effetto per reset dell'errore quando il componente viene smontato
  useEffect(() => {
    return () => {
      dispatch(resetError()); // Reset dell'errore al termine del ciclo di vita del componente
    };
  }, [dispatch]);

  useEffect(() => {
    // Imposta il loading su false quando i clienti sono stati caricati e ci sono errori
    if (clients !== undefined || error) {
      setLoading(false); // Imposta il caricamento su false quando i clienti sono disponibili o vuoti e ci sono errori
    }
  }, [clients, error]); // Aggiungi 'error' come dipendenza, per aggiornare il loading anche in caso di errori

  return (
    <Container fluid className="p-4">
      {/* Mostra un alert in caso di errore */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> {/* Mostra il messaggio di errore */}
        </Alert>
      )}

      {/* Condizione per visualizzare lo spinner solo se i clienti sono in fase di caricamento */}
      {loading && clients !== undefined && clients.length === 0 ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        // Se i dati sono caricati o vuoti, mostra i clienti raggruppati
        Object.keys(groupedClients).length === 0 ? (
          // Se non ci sono clienti, mostra il messaggio in inglese
          <Row className="justify-content-center">
            <Col xs={12}>
              <p>No clients available</p> {/* Messaggio che appare se non ci sono clienti */}
            </Col>
          </Row>
        ) : (
          // Mostra i clienti raggruppati per lettera iniziale del cognome
          Object.keys(groupedClients).sort().map((initial) => (
            <div key={initial}>
              <h2 className="mt-4">{initial}</h2> {/* Mostra la lettera iniziale */}
              <Row className="g-4">
                {groupedClients[initial].map((client) => (
                  <Col xs={12} md={6} xl={4} key={client.id}>
                    <Card className="mb-3" style={{ maxWidth: '100%' }}>
                      <Card.Body>
                        <Card.Title>{`${client.cognome} ${client.nome}`}</Card.Title> {/* Mostra il nome completo del cliente */}
                        <Card.Text>{client.email}</Card.Text> {/* Mostra l'email del cliente */}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))
        )
      )}
    </Container>
  );
};

export default BeautyCenterClientsPage;
