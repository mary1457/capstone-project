import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, InputGroup, Form, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaPen, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiloBC, updateProfilo, deleteProfilo, setField, resetError } from '../../redux/actions/profiloActions';
import { useNavigate } from 'react-router-dom';

const BeautyCenterProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileBc = useSelector((state) => state.profilo.profileBc);  // Profilo del Beauty Center
  const profileForm = useSelector((state) => state.profilo.profileForm); // Stato del form per l'update
  const accessToken = useSelector((state) => state.accessToken.accessToken); // Token di accesso per autenticazione
  const error = useSelector((state) => state.profilo.error); // Errori dal profilo
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [showModal, setShowModal] = useState(false); // Stato per la visualizzazione del modal

  // Carica il profilo del Beauty Center all'avvio
  useEffect(() => {
    if (accessToken) {
      dispatch(getProfiloBC(accessToken));
      setLoading(false); // Imposta il caricamento a false una volta ottenuti i dati
    }
  }, [dispatch, accessToken]);

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

  return (
    <Container fluid className="p-4">
      {/* Mostra un messaggio di errore se presente */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> {/* Visualizza il messaggio di errore */}
        </Alert>
      )}

      {/* Spinner di caricamento */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" /> {/* Mostra lo spinner mentre i dati sono in fase di caricamento */}
        </Row>
      ) : (
        <Row className="g-4 d-flex justify-content-center align-items-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <Card style={{ width: '100%', padding: '20px' }}>
              <div className="text-center mt-3">
                <Card.Img
                  src={profileBc.avatar} // Immagine dell'avatar
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fs-3 mb-3">
                {profileBc.nomeCentroEstetico}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted fs-5">
                {profileBc.indirizzo}, {profileBc.citta}
                </Card.Subtitle>
                {/* Altri dettagli del profilo */}
                <Card.Text className="mb-0">
                {profileBc.nome} {profileBc.cognome} {/* Nome e cognome */}
              
                    </Card.Text>
                    <Card.Text>
               
                {profileBc.email} {/* Email */}
                    </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BeautyCenterProfilePage;
