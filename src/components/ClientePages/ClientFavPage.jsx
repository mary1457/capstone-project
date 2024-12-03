import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  deletePreferiti,
  getPreferiti,
  resetAll,
} from '../../redux/actions/preferitiActions';

const ClientFavPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const preferiti = useSelector((state) => state.preferiti.preferiti);
  const error = useSelector((state) => state.preferiti.error); // Access error state
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch favorites when the component mounts
  useEffect(() => {
    if (accessToken) {
      dispatch(getPreferiti(accessToken));
    }
  }, [dispatch, accessToken]);

  // Update loading state when preferiti or error changes
  useEffect(() => {
    if (preferiti.length > 0 || error) {
      setLoading(false); // Stop loading when data is fetched or error occurs
    }
  }, [preferiti, error]);

  const handleRemoveFromFavorites = (id) => {
 
      setLoading(true); // Start loading when removing a favorite
      dispatch(deletePreferiti(accessToken, id));
   
  };

  const handleCloseError = () => {
    dispatch(resetAll());
  };

  useEffect(() => {
    return () => {
      dispatch(resetAll()); 
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-4">
      {/* Error Alert */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong>
        </Alert>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        <Row className="g-4">
          {preferiti && preferiti.length > 0 ? (
            preferiti.map((fav) => (
              <Col xs={12} md={6} xl={4} key={fav.id}>
                <Card className="mb-3" style={{ maxWidth: '100%' }}>
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
