import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPreferiti,
  deletePreferiti,
  getPreferiti,
} from '../../redux/actions/preferitiActions';

const ClientFavPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken);

  
 

  
  const preferiti = useSelector((state) => state.preferiti.preferiti);

 
  const handleRemoveFromFavorites = (id) => {
    if (id) {
      dispatch(deletePreferiti(accessToken, id)); 
    } else {
      console.error('ID not found for the item');
    }
  };

  return (
    <Container fluid className="p-4">
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
                <div className="row g-0">
                  <div className="col-12">
                    <Card.Body>
                      <Card.Title>{fav.centroEstetico.nomeCentroEstetico}</Card.Title>
                      <Card.Text className='mb-0'>{fav.centroEstetico.indirizzo}</Card.Text>
                      <Card.Text>{fav.centroEstetico.citta}</Card.Text>
                      <Card.Text>
                        <small className="text-muted">{fav.centroEstetico.email}</small>
                      </Card.Text>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <p>No favorites</p> 
        )}
      </Row>
    </Container>
  );
};

export default ClientFavPage;
