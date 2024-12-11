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
  const error = useSelector((state) => state.preferiti.error); 
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    if (accessToken) {
      dispatch(getPreferiti(accessToken));
    }
  }, [dispatch, accessToken]);

  
  useEffect(() => {
  
    if (preferiti.length > 0 || error) {
      setLoading(false);
    }
  }, [preferiti, error]); 

  
  const handleRemoveFromFavorites = (id) => {
    setLoading(true); 
    dispatch(deletePreferiti(accessToken, id));
  };

  
  const handleCloseError = () => {
    dispatch(resetError());
  };

  
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

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
        <Row className="g-4">
       
          {preferiti && preferiti.length > 0 ? (
            preferiti.map((fav) => (
              <Col xs={12} md={6} xl={4} key={fav.id}>
                <Card className="mb-3 custom-card" style={{ maxWidth: '100%' }}>
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
            
              <p>No favorites found</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ClientFavPage;
