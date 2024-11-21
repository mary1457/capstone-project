import { Container, Row, Col, Card, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { FaHeart, FaUser, FaLock, FaPen, FaEnvelope } from 'react-icons/fa';
import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, deleteProfile } from '../../redux/actions/UtenteAction'; 
import { useNavigate } from 'react-router-dom';

const ClientProfilePage = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.utente.profile);
  const token = useSelector((state) => state.accessToken.token);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile(token));
  }, [dispatch, token]);

  const handleDelete = () => {
    dispatch(deleteProfile(token));
    navigate('/register');
  };

  return (
    <Container fluid className="p-4">
      <Row className="g-4 d-flex justify-content-center align-items-center">
        {/* Card Profilo */}
        <Col xs={12} md={8} lg={6} xl={4}>
          <Card style={{ width: '100%' }}>
            <div className="text-center mt-3">
              <Card.Img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="rounded-circle"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
            <Card.Body className="text-center">
              <Card.Title>{profileData.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card subtitle</Card.Subtitle>
              <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Modale Statico */}
        <Col xs={12} md={8} lg={6} xl={4}>
          <div className="static-modal">
            <Modal.Dialog>
            
              <Modal.Body>
                <Form id="register-form">
                  {/* Campo Nome */}
                  <Form.Group className="mb-3" controlId="name">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        required
                      />
                      <InputGroup.Text>
                        <FaUser />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* Campo Cognome */}
                  <Form.Group className="mb-3" controlId="surname">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Surname"
                        required
                      />
                      <InputGroup.Text>
                        <FaPen />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* Campo Email */}
                  <Form.Group className="mb-3" controlId="email">
                    <InputGroup>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        required
                      />
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* Campo Password */}
                  <Form.Group className="mb-3" controlId="password">
                    <InputGroup>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                      />
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* Bottone per inviare il form */}
                  <Button variant="primary" type="submit" className="w-100 mb-2">
                    Register
                  </Button>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientProfilePage;
