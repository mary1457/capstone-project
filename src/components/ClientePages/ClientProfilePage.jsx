import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, InputGroup, Form, Alert, Spinner } from 'react-bootstrap';
import { FaHeart, FaUser, FaLock, FaPen, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilo, updateProfilo, deleteProfilo, setField, resetAll } from '../../redux/actions/profiloActions';
import { useNavigate } from 'react-router-dom';
import {
   clearStorageAndStore
  } from '../../redux/actions/accessTokenActions';
const ClientProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profilo.profile);
  const profileForm = useSelector((state) => state.profilo.profileForm);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const error = useSelector((state) => state.prenotazioni.error); // Access error state
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // Fetch profile data
  useEffect(() => {
    if (accessToken) {
      dispatch(getProfilo(accessToken));
    }
  }, [dispatch, accessToken]);

  // Sync profile form state with fetched profile data
  useEffect(() => {
    if (profile) {
      const fieldsToSync = ['nome', 'cognome', 'email'];
      fieldsToSync.forEach((field) => {
        if (profile[field]) {
          dispatch(setField({ id: field, value: profile[field] }));
        }
      });
      setLoading(false); // Once profile is loaded, stop loading
    }
  }, [profile, dispatch]);

  // Error handling
  const handleCloseError = () => {
    // Reset the error when the user closes the alert
    dispatch({ type: 'RESET_ERROR' });
  };

  const handleDelete = () => {
    dispatch(deleteProfilo(accessToken));
    dispatch(clearStorageAndStore());
    navigate('/login');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setField({ id, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfilo(profileForm, accessToken))
    setShowModal(false);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetAll());
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-4">
      {/* Show error alert if there is an error */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> 
        </Alert>
      )}

      {/* Show spinner if loading */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        <Row className="g-4 d-flex justify-content-center align-items-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <Card style={{ width: '100%', padding: '20px' }}>
              <div className="text-center mt-3">
                <Card.Img
                  src={profile.avatar}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fs-3 mb-3">
                  {profile.nome} {profile.cognome}
                </Card.Title>
                <Card.Subtitle className="mb-4 text-muted fs-5">{profile.email}</Card.Subtitle>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Modal for Profile Edit */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="register-form" onSubmit={handleSubmit}>
                {/* Name Field */}
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

                {/* Surname Field */}
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

                {/* Email Field */}
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
