import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { FaHeart, FaUser, FaLock, FaPen, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilo, updateProfilo, deleteProfilo, setField } from '../../redux/actions/profiloActions';
import { useNavigate } from 'react-router-dom';

const ClientProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profilo.profile);
  const profileForm = useSelector((state) => state.profilo.profileForm);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    dispatch(getProfilo(accessToken));
  }, [dispatch, accessToken]);

  
  useEffect(() => {
    if (profile) {
      const fieldsToSync = ['nome', 'cognome', 'email'];
      fieldsToSync.forEach((field) => {
        if (profile[field]) {
          dispatch(setField({ id: field, value: profile[field] }));
        }
      });
    }
  }, [profile, dispatch]);
  

  const handleDelete = () => {
    dispatch(deleteProfilo(accessToken));
    navigate('/register');
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

  return (
    <Container fluid className="p-4">
      <Row className="g-4 d-flex justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6} xl={4}>
          <Card style={{ width: '100%' }}>
            <div className="text-center mt-3">
              <Card.Img
                src={profile.avatar}
                alt="Profile"
                className="rounded-circle"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
            <Card.Body className="text-center">
              <Card.Title>{profile.nome} {profile.cognome}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{profile.email}</Card.Subtitle>
              <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" className="me-2" onClick={() => setShowModal(true)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

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

             
              <Form.Group className="mb-3" controlId="email">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={profileForm.email }
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
    </Container>
  );
};

export default ClientProfilePage;
