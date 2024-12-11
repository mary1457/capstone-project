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
  const error = useSelector((state) => state.profilo.error); 
  const [loading, setLoading] = useState(true); 
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const getInitials = (name, surname) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : '';
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  };

  
  const generateAvatarUrl = (name, surname, background = 'e9516c', color = 'fde9d2') => {
    const initials = getInitials(name, surname);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${background}&color=${color}`;
  };

  
  useEffect(() => {
    if (accessToken) {
      dispatch(getProfilo(accessToken));
    }
  }, [dispatch, accessToken]);

 
  useEffect(() => {
    if (profile) {
      const fieldsToSync = ['nome', 'cognome', 'email']; 
      fieldsToSync.forEach((field) => {
        if (profile[field]) {
          dispatch(setField({ id: field, value: profile[field] }));
        }
      });
      setLoading(false); 
    }
  }, [profile, dispatch]);

  
  const handleCloseError = () => {
    dispatch(resetError());
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
    dispatch(updateProfilo(profileForm, accessToken)); 
    setShowModal(false); 
  };

  
  useEffect(() => {
    return () => {
      dispatch(resetError()); 
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearStorageAndStore()); 
    navigate('/login'); 
  };

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
        <Row className="g-4 d-flex justify-content-center align-items-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <Card style={{ width: '100%', padding: '20px' }} className='custom-card'>
              <div className="text-center mt-3">
             
                <Card.Img
                  src={generateAvatarUrl(profile.nome, profile.cognome)}
                  alt="Profile"
                  className="rounded-circle custom-img"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fs-3 mb-3">
                
                  {profile.nome} {profile.cognome}
                </Card.Title>
                <Card.Subtitle className="mb-4 text-muted fs-5">{profile.email}</Card.Subtitle>
                <div className="d-flex justify-content-center gap-3">
                 
                  <Button variant="success" onClick={() => setShowModal(true)}>
                    Edit
                  </Button>
                  <Button variant="warning" onClick={handleLogout} >
                   Logout
                 </Button>
                
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

        
          <Modal show={showModal} onHide={() => setShowModal(false)} centered className='custom-modal'>
            <Modal.Header closeButton >
              <Modal.Title >Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id="register-form" onSubmit={handleSubmit}>
              
                <Form.Group className="mb-3 custom-input" controlId="nome">
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

               
                <Form.Group className="mb-3 custom-input" controlId="cognome">
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

             
                <Form.Group className="mb-3 custom-input" controlId="email">
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

                <Button variant="primary" type="submit" className="w-100 custom-button">
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
