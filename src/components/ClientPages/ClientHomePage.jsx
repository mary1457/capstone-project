import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Card, Button, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  setField,
  resetAll,
  ricerca,
} from "../../redux/actions/homeActions";
import {
  getPreferiti,
  postPreferiti,
  deletePreferiti,
} from "../../redux/actions/preferitiActions";

import {

  postPrenotazioni,

} from "../../redux/actions/prenotazioniActions";

const ClientHomePage = () => {
  const dispatch = useDispatch();

  const searchData = useSelector((state) => state.home.searchForm);
  const result = useSelector((state) => state.home.searchResult);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const preferiti = useSelector((state) => state.preferiti.preferiti);

  // Funzione per ottenere tutti gli orari dalle 9:00 alle 18:00
  const getAvailableHours = () => {
    const hours = [];
    for (let hour = 9; hour <= 18; hour++) {
      hours.push(`${hour < 10 ? '0' : ''}${hour}:00`);
    }
    return hours;
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getPreferiti(accessToken));
    }
  }, [dispatch, accessToken]);

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

    await dispatch(ricerca(searchData, accessToken));
  };

  const handleToggleFavorite = (item) => {
    const isFavorite = preferiti.find((fav) => fav.centroEstetico.id === item.id);

    if (isFavorite) {
      dispatch(deletePreferiti(accessToken, isFavorite.id));
    } else {
      dispatch(postPreferiti(accessToken, item));
    }
  };


  const handleSaveRes = async (item, orario) => {
    console.log(item)
    console.log(orario)

    const data= searchData.dataPrenotazione+"T"+orario+":00"
 console.log(data)
   const result= await dispatch(postPrenotazioni(accessToken, item, data));
   if (result) {dispatch(ricerca(searchData, accessToken))}


  };

  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Form id="search-form" onSubmit={handleSubmit}>
          <Col xs={12} md={10}>
            <Form.Group controlId="trattamento" className="mb-3">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Select
                  aria-label="Seleziona un trattamento"
                  value={searchData.trattamento}
                  onChange={handleChange}
                >
                  <option value="">Treatments</option>
                  <option value="SKIN_CARE_TREATMENTS">SKIN CARE TREATMENTS</option>
                  <option value="BODY_TREATMENTS">BODY TREATMENTS</option>
                  <option value="HAIR_REMOVAL_SERVICES">HAIR REMOVAL SERVICES</option>
                  <option value="NAIL_AND_HAND_CARE">NAIL AND HAND CARE</option>
                  <option value="ANTI_AGING_AND_REJUVENATION">ANTI AGING AND REJUVENATION</option>
                  <option value="MAKEUP_AND_COSMETIC_ENHANCEMENTS">MAKEUP AND COSMETIC ENHANCEMENTS</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={10}>
            <Form.Group className="mb-3" controlId="citta">
              <InputGroup>
                <InputGroup.Text>
                  <FaMapMarkerAlt />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={searchData.citta}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={10}>
            <Form.Group className="mb-3" controlId="dataPrenotazione">
              <InputGroup>
                <Form.Control
                  type="date"
                  value={searchData.dataPrenotazione}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={2}>
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Search
            </Button>
          </Col>
        </Form>
      </Row>

      <Row className="g-4">
        {result.length > 0 ? (
          result.map((item) => {
            // Creiamo un set di orari prenotati (escludendo quelli con stato "PRENOTATO")
            const prenotati = new Set(
              item.disponibilita
                .filter((orario) => orario.stato === "PRENOTATO")
                .map((orario) => {
                  // Estrarre solo l'ora in formato "HH:00"
                  return orario.data.slice(11, 16);
                })
            );

            // Orari disponibili tra le 9:00 e le 18:00
            const availableHours = getAvailableHours().filter((hour) => !prenotati.has(hour));

            return (
              <Col xs={12} md={6} xl={4} key={item.id}>
                <Card className="mb-3" style={{ maxWidth: "100%" }}>
                  <div
                    className="d-flex justify-content-end position-absolute p-2"
                    style={{ top: "0", right: "0" }}
                  >
                    <FaHeart
                      size={24}
                      color={preferiti.find((fav) => fav.centroEstetico.id === item.id) ? "red" : "grey"}
                      onClick={() => handleToggleFavorite(item)}
                    />
                  </div>

                  <div className="row g-0">
                    <div className="col-12">
                      <Card.Body>
                        <Card.Title>{item.nomeCentroEstetico}</Card.Title>
                        <Card.Text>{item.indirizzo}</Card.Text>
                        <Card.Text>
                          <small className="text-muted">{item.email}</small>
                        </Card.Text>
                        <ListGroup variant="flush" className="d-flex justify-content-between">
                          {/* Creiamo la lista di orari disponibili */}
                          {availableHours.map((hour, index) => (
                            <ListGroup.Item key={index}>{hour}  
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleSaveRes(item.id,availableHours[index])}
                            >
                              Prenota
                            </Button></ListGroup.Item>

                          ))}
                        </ListGroup>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })
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
