import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'; 
import { addToFavorite, deletePreferiti, postPreferiti, removeFromFavorite } from "../../redux/actions/CardAction";
import { getPreferiti } from '../../redux/actions/UtenteAction';

const ClientFavPage = () => {
  const dispatch = useDispatch(); 
  const favorites = useSelector((state) => state.card.favorites); 
  const token = useSelector((state) => state.accessToken.token);
  useEffect(() => {
    // Quando il componente si monta, chiamiamo l'azione per ottenere il profilo
    dispatch(getPreferiti(token));
  }, [dispatch, token]);

  
  const handleFavoriteClick = (item) => {
    console.log(item);
    dispatch(favorites.some(fav => fav.id === item.id) ? deletePreferiti(token, item) : postPreferiti(token, item));
  };

  return (
    <Container fluid className="p-4">
      <Row className="g-4">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <Col xs={12} md={6} xl={4} key={item.id}>
              <Card className="mb-3" style={{ maxWidth: '100%' }}>
                {/* Icona a cuore in alto a destra */}
                <div className="d-flex justify-content-end position-absolute p-2" style={{ top: '0', right: '0' }}>
                  <FaHeart
                    size={24}
                    className={favorites.some(fav => fav.id === item.id) ? "text-danger" : "text-muted"}
                    onClick={() => handleFavoriteClick(item)} // Aggiungi/rimuovi dai preferiti
                  />
                </div>
                <div className="row g-0">
                  {/* Sezione immagine */}
                  <div className="col-12 col-lg-4 d-block d-lg-none">
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                  </div>
     
                  {/* Sezione contenuto card */}
                  <div className="col-12">
                    <Card.Body>
                      <Card.Title>{item.nameBeautyCenter}</Card.Title>
                      <Card.Text>{item.address}</Card.Text>
                      <Card.Text>
                        <small className="text-muted">{item.email}</small>
                      </Card.Text>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <p>No preferiti</p> 
        )}
      </Row>
    </Container>
  );
};

export default ClientFavPage;
