import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Card, Button, InputGroup, ListGroup, Alert } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  setFieldSearch,
  ricerca,
  resetError
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

  const [searchPerformed, setSearchPerformed] = useState(false);
  const searchData = useSelector((state) => state.home.searchForm);
  const result = useSelector((state) => state.home.searchResult);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const preferiti = useSelector((state) => state.preferiti.preferiti);
  const error = useSelector((state) => state.home.error);

  // Funzione per ottenere le ore disponibili per la prenotazione
  const getAvailableHours = () => {
    const hours = [];
    for (let hour = 9; hour <= 17; hour++) {
      hours.push(`${hour < 10 ? "0" : ""}${hour}:00`);
    }

    const today = new Date();
    const selectedDate = new Date(searchData.dataPrenotazione);

    // Se la data selezionata è oggi, mostra solo le ore future
    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      const currentHour = today.getHours();
      return hours.filter((hour) => {
        const hourValue = parseInt(hour.slice(0, 2), 10);
        return hourValue > currentHour;
      });
    }

    return hours; // Altrimenti, tutte le ore sono disponibili
  };

  // Effetto per ottenere i preferiti dell'utente quando il componente è montato
  useEffect(() => {
    if (accessToken) {
      dispatch(getPreferiti(accessToken));
    }
  }, [dispatch, accessToken]);

  // Effetto per eseguire la ricerca quando i dati di ricerca sono completi
  useEffect(() => {
    if (searchData.dataPrenotazione && searchData.trattamento && searchData.citta) {
      setSearchPerformed(true);
      dispatch(ricerca(searchData, accessToken)); // Chiamata API per la ricerca
    }
  }, [searchData, dispatch, accessToken]);

  // Reset dell'errore quando il componente viene smontato
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  // Funzione per chiudere l'errore
  const handleCloseError = () => {
    dispatch(resetError());
  };

  // Funzione per gestire il cambiamento dei campi nel form
  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setFieldSearch({ id, value }));
  };

  // Funzione per aggiungere o rimuovere dai preferiti
  const handleToggleFavorite = (item) => {
    const isFavorite = preferiti.find((fav) => fav.centroEstetico.id === item.id);

    if (isFavorite) {
      dispatch(deletePreferiti(accessToken, isFavorite.id)); // Rimuove dai preferiti
    } else {
      dispatch(postPreferiti(accessToken, item)); // Aggiunge ai preferiti
    }
  };

  // Funzione per salvare la prenotazione
  const handleSaveRes = async (item, orario) => {
    const data = searchData.dataPrenotazione + "T" + orario + ":00"; // Formatta la data
    const result = await dispatch(postPrenotazioni(accessToken, item, data));
    if (result) {
      dispatch(ricerca(searchData, accessToken)); // Ricarica i risultati dopo la prenotazione
    }
  };

  // Verifica se i dati di ricerca sono validi
  const isSearchValid =
    searchData.dataPrenotazione &&
    searchData.trattamento &&
    searchData.citta;

  return (
    <Container fluid className="p-4">
      {/* Se c'è un errore, mostra un messaggio di errore */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong>
        </Alert>
      )}

      {/* Form di ricerca */}
      <Form id="search-form">
        <Row className="mb-4">
          <Col xs={12}>
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
                  <option value="MAKEUP_AND_COSMETIC_ENHANCEMENTS">
                    MAKEUP AND COSMETIC ENHANCEMENTS
                  </option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
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
          <Col xs={12} md={6}>
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
        </Row>
      </Form>

      <Row className="g-4">
        {/* Se la ricerca non è stata effettuata o è invalida, mostra schede statiche */}
        {!isSearchValid || !searchPerformed ? (
          [1, 2, 3, 4, 5, 6].map((key) => (
            <Col xs={12} md={6} xl={4} key={key}>
              <Card className="text-bg-dark">
                <Card.Img
                  variant="top"
                  src={`https://via.placeholder.com/150?text=Card+${key}`}
                  alt={`Card ${key}`}
                />
                <Card.ImgOverlay>
                  <Card.Title>{`Static Card ${key}`}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))
        ) : new Date(searchData.dataPrenotazione) < new Date().setHours(0, 0, 0, 0) ? (
          // Se la data selezionata è passata, mostra un messaggio più appropriato
          <Col xs={12}>
            <p>The selected date is in the past. Please choose a future date to make a booking.</p>
          </Col>

        ) : result.length > 0 ? (
          // Mostra i risultati della ricerca se esistono
          result.map((item) => {
            const prenotati = new Set(
              item.disponibilita
                .filter((orario) => orario.stato === "PRENOTATO")
                .map((orario) => orario.data.slice(11, 16))
            );
            const availableHours = getAvailableHours().filter(
              (hour) => !prenotati.has(hour)
            );

            return (
              <Col xs={12} md={6} xl={4} key={item.id}>
                <Card className="mb-3" style={{ maxWidth: "100%" }}>
                  <div
                    className="d-flex justify-content-end position-absolute p-2"
                    style={{ top: "0", right: "0" }}
                  >
                    <FaHeart
                      size={24}
                      color={preferiti.find(
                        (fav) => fav.centroEstetico.id === item.id
                      )
                        ? "red"
                        : "grey"}
                      onClick={() => handleToggleFavorite(item)}
                    />
                  </div>

                  <Card.Body>
                    <Card.Title>{item.nomeCentroEstetico}</Card.Title>
                    <Card.Text>{item.indirizzo}</Card.Text>
                    <ListGroup
                      variant="flush"
                      className="d-flex justify-content-between"
                    >
                      {availableHours.length > 0 ? (
                        availableHours.map((hour, index) => (
                          <ListGroup.Item
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <span>{hour}</span>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleSaveRes(item, hour)}
                            >
                              Book
                            </Button>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <p>No available hours</p>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          // Messaggio di nessun risultato trovato
          <Col xs={12}>
            <p>No results found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ClientHomePage;
