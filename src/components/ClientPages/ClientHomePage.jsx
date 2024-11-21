import { Container, Row, Col, Form, Card, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { setField, resetMessages, resetAll, getSearch, setProperty} from "../../redux/actions/UtenteAction";
import { addToFavorite, removeFromFavorite , postPreferiti , deletePreferiti} from "../../redux/actions/CardAction";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { FaHeart } from 'react-icons/fa';

function ClientHomePage() {
  const dispatch = useDispatch();

  // Selezioniamo i dati dallo stato Redux
  const searchData = useSelector((state) => state.utente.searchForm);
  const result = useSelector((state) => state.utente.resultSearch); 
  const error = useSelector((state) => state.utente.error);
  const token = useSelector((state) => state.accessToken.token);
  const favorites = useSelector((state) => state.card.favorites); // Preferiti dai Redux state

  // Resetta tutto al momento dello smontaggio del componente
  useEffect(() => {
    return () => {
      dispatch(resetAll());
    };
  }, [dispatch]);

  // Gestisce i cambiamenti nei campi del modulo
  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setField({ id, value }));
  };

  // Gestisce l'invio del modulo
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(getSearch(searchData, token));
  };

  const handleFavoriteClick = async (item, i) => {

    const result = await dispatch(favorites.some(fav => fav.id === item.favId) ? deletePreferiti(token, item) : postPreferiti(token, item));
    console.log(result);
    const resultfav ={
      index: i, // La posizione nell'array
      newProperty: 'favId',
      value: result.id
    }
    dispatch(setProperty( resultfav ));
  };
  

  return (
    <Container fluid className="p-4">
      {/* Barra di ricerca */}
      <Row className="mb-4">
        <Form id="search-form" onSubmit={handleSubmit}>
          <Col xs={12} md={10}>
            <Form.Group controlId="trattamenti" className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Select
                  aria-label="Seleziona un trattamento"
                  value={searchData.trattamenti}
                  onChange={handleChange}
                >
                  <option value="">Scegli un trattamento</option>
                  <option value="LASER">LASER</option>
                  <option value="DEPILAZIONE">DEPILAZIONE</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={10}>
            <Form.Group className="mb-3" controlId="city">
              <InputGroup>
                <InputGroup.Text>
                  <FaMapMarkerAlt />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Inserisci una città"
                  value={searchData.city}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={2}>
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Cerca
            </Button>
          </Col>
        </Form>
      </Row>

      {/* Risultati */}
      <Row className="g-4">
        {result.length > 0 ? (
          result.map((item, i) => (
            <Col xs={12} md={6} xl={4} key={item.id}>
              <Card className="mb-3" style={{ maxWidth: '100%' }}>
                {/* Heart icon in the top right corner */}
                <div className="d-flex justify-content-end position-absolute p-2" style={{ top: '0', right: '0' }}>
                  <FaHeart
                    size={24}
                    className={favorites.some(fav => fav.id === item.favId) ? "text-danger" : "text-muted"}
                    onClick={() => handleFavoriteClick(item, i)}
                  />
                </div>
                <div className="row g-0">
                  {/* Image Section */}
                  <div className="col-12 col-lg-4 d-block d-lg-none">
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                  </div>
     
                  {/* Card Content Section */}
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
          [1, 2, 3, 4, 5, 6].map((key) => (
            <Col xs={12} md={6} xl={4} key={key}>
              <Card className="text-bg-dark">
                <Card.Img
                  variant="top"
                  src={`https://via.placeholder.com/150?text=Card+${key}`}
                  alt={`Card ${key}`}
                />
                <Card.ImgOverlay>
                  <Card.Title>{`Card Title ${key}`}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default ClientHomePage;
