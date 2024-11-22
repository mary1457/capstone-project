import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  getPreferiti,
} from '../../redux/actions/cardActions';

const ClientFavPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken);

  // Carica i preferiti quando il componente è montato
  useEffect(() => {
    dispatch(getPreferiti(accessToken));
  }, [dispatch, accessToken]);

  // Dati dal Redux Store
  const favorites = useSelector((state) => state.card.favorites); // Preferiti

  // Funzione per gestire la rimozione dai preferiti
  const handleRemoveFromFavorites = (id) => {
    if (id) {
      dispatch(removeFromFavorites(accessToken, id)); // Passa l'ID per la rimozione
    } else {
      console.error("ID non trovato per l'elemento");
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="g-4">
        {favorites && favorites.length > 0 ? (
          favorites.map((book) => (
            <Col xs={12} md={6} xl={4} key={book.id}>
              <Card className="mb-3" style={{ maxWidth: '100%' }}>
                <div
                  className="d-flex justify-content-end position-absolute p-2"
                  style={{ top: '0', right: '0' }}
                >
                  <FaHeart
                    size={24}
                    color="red" // Mostra cuori rossi per i preferiti
                    onClick={() => handleRemoveFromFavorites(book.id)} // Usa la funzione per rimuovere
                  />
                </div>
                <div className="row g-0">
                  <div className="col-12">
                    <Card.Body>
                      <Card.Title>{book.nameBeautyCenter}</Card.Title>
                      <Card.Text>{book.address}</Card.Text>
                      <Card.Text>
                        <small className="text-muted">{book.email}</small>
                      </Card.Text>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <p>No preferiti</p> // Messaggio se non ci sono preferiti
        )}
      </Row>
    </Container>
  );
};

export default ClientFavPage;
