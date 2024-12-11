import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, InputGroup, Form, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiloBC, resetError } from '../../redux/actions/profiloActions';
import { useNavigate } from 'react-router-dom';
import { clearStorageAndStore } from '../../redux/actions/accessTokenActions';

const BeautyCenterProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileBc = useSelector((state) => state.profilo.profileBc); 
  const accessToken = useSelector((state) => state.accessToken.accessToken); 
  const error = useSelector((state) => state.profilo.error); 
  const [loading, setLoading] = useState(true); 
  
  
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
      dispatch(getProfiloBC(accessToken));
      setLoading(false); 
    }
  }, [dispatch, accessToken]);

  const handleCloseError = () => {
    dispatch(resetError()); 
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
                  src={generateAvatarUrl(profileBc.nome, profileBc.cognome)}
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
                <Card.Text className="mb-0">
                  {profileBc.nome} {profileBc.cognome} 
                </Card.Text>
                <Card.Text>
                  {profileBc.email} 
                </Card.Text>
                <div className="d-flex justify-content-center gap-3">
                 
                 <Button variant="warning" onClick={handleLogout} >
                   Logout
                 </Button>
               
                 
               </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BeautyCenterProfilePage;
