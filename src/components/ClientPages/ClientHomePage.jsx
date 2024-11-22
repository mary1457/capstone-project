import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Card, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  setField,
  resetAll,
  getSearch,
} from "../../redux/actions/utenteActions";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/actions/cardActions"; 

const ClientHomePage = () => {
  const dispatch = useDispatch();

  const searchData = useSelector((state) => state.utente.searchForm);
  const result = useSelector((state) => state.utente.resultSearch);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const favorites = useSelector((state) => state.card.favorites); 

  useEffect(() => {
    return () => {
      dispatch(resetAll());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setField({ id, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(getSearch(searchData, accessToken));
  };

  const handleToggleFavorite = (item) => {
    const isFavorite = favorites.find((fav) => fav.centroEstetico.id === item.id); 
    console.log("isFavorite", isFavorite); 
  
    if (isFavorite) {
      console.log("Rimosso dai preferiti", item.id); 
      dispatch(removeFromFavorites(accessToken, isFavorite.id));
    } else {
      console.log("Aggiunto ai preferiti", item); 
      dispatch(addToFavorites(accessToken, item));
    }
  };
  

  return (
    <Container fluid className="p-4">
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

      <Row className="g-4">
        {result.length > 0 ? (
          result.map((item) => (
            <Col xs={12} md={6} xl={4} key={item.id}>
              <Card className="mb-3" style={{ maxWidth: "100%" }}>
                <div
                  className="d-flex justify-content-end position-absolute p-2"
                  style={{ top: "0", right: "0" }}
                >
                  <FaHeart
                    size={24}
                    color={favorites.find((fav) => fav.centroEstetico.id === item.id) ? "red" : "grey"} 
                    onClick={() => handleToggleFavorite(item)} 
                  />
                </div>
                <div className="row g-0">
                  <div className="col-12 col-lg-4 d-block d-lg-none">
                    <Card.Img variant="top" src="https://via.placeholder.com/150" />
                  </div>
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
};

export default ClientHomePage;
