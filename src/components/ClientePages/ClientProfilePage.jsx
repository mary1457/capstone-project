import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, InputGroup, Form, Alert, Spinner } from 'react-bootstrap';
import { FaUser, FaPen, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilo, updateProfilo, deleteProfilo, setField, resetError } from '../../redux/actions/profiloActions';
import { useNavigate } from 'react-router-dom';
import { clearStorageAndStore } from '../../redux/actions/accessTokenActions';

const ClientProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profilo.profile);
  const profileForm = useSelector((state) => state.profilo.profileForm);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const error = useSelector((state) => state.profilo.error); // Stato dell'errore
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [showModal, setShowModal] = useState(false); // Stato per la visibilità del Modal di modifica
  const navigate = useNavigate();

  // Recupera i dati del profilo quando il componente viene montato
  useEffect(() => {
    if (accessToken) {
      dispatch(getProfilo(accessToken));
    }
  }, [dispatch, accessToken]);

  // Sincronizza lo stato del form con i dati del profilo appena recuperati
  useEffect(() => {
    if (profile) {
      const fieldsToSync = ['nome', 'cognome', 'email']; // I campi che vogliamo sincronizzare
      fieldsToSync.forEach((field) => {
        if (profile[field]) {
          dispatch(setField({ id: field, value: profile[field] }));
        }
      });
      setLoading(false); // Fermiamo il caricamento dopo aver recuperato il profilo
    }
  }, [profile, dispatch]);

  // Funzione per chiudere l'alert in caso di errore
  const handleCloseError = () => {
    dispatch(resetError());
  };

  // Funzione per eliminare il profilo dell'utente
  const handleDelete = () => {
    dispatch(deleteProfilo(accessToken)); // Elimina il profilo dal backend
    dispatch(clearStorageAndStore()); // Pulisce i dati dal localStorage
    navigate('/login'); // Ritorna alla pagina di login
  };

  // Funzione per gestire il cambiamento dei campi nel form
  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setField({ id, value }));
  };

  // Funzione per inviare i dati del form e aggiornare il profilo
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfilo(profileForm, accessToken)); // Invia i dati aggiornati del profilo
    setShowModal(false); // Chiude il Modal dopo l'aggiornamento
  };

  // Cleanup: Reset dell'errore quando il componente viene smontato
  useEffect(() => {
    return () => {
      dispatch(resetError()); // Reset dell'errore
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-4">
      {/* Mostriamo un alert in caso di errore */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> {/* Mostra il messaggio di errore */}
        </Alert>
      )}

      {/* Mostriamo uno spinner di caricamento mentre i dati sono in fase di recupero */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        <Row className="g-4 d-flex justify-content-center align-items-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <Card style={{ width: '100%', padding: '20px' }}>
              <div className="text-center mt-3">
                {/* Mostra l'avatar del profilo */}
                <Card.Img
                  src={profile.avatar}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fs-3 mb-3">
                  {/* Mostra il nome e il cognome dell'utente */}
                  {profile.nome} {profile.cognome}
                </Card.Title>
                <Card.Subtitle className="mb-4 text-muted fs-5">{profile.email}</Card.Subtitle>
                <div className="d-flex justify-content-center gap-3">
                  {/* Pulsante per modificare il profilo */}
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Edit
                  </Button>
                  {/* Pulsante per eliminare il profilo */}
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Modal per la modifica del profilo */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="register-form" onSubmit={handleSubmit}>
                {/* Campo per il nome */}
                <Form.Group className="mb-3" controlId="nome">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={profileForm.nome}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                {/* Campo per il cognome */}
                <Form.Group className="mb-3" controlId="cognome">
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Surname"
                      value={profileForm.cognome}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>
                      <FaPen />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                {/* Campo per l'email */}
                <Form.Group className="mb-3" controlId="email">
                  <InputGroup>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={profileForm.email}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-2">
                  Update
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Row>
      )}
    </Container>
  );
};

export default ClientProfilePage;
