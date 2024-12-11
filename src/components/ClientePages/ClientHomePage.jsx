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

import Select from 'react-select';

const options = [
  { value: 'SKIN_CARE_TREATMENTS', label: 'SKIN CARE TREATMENTS' },
  { value: 'BODY_TREATMENTS', label: 'BODY TREATMENTS' },
  { value: 'HAIR_REMOVAL_SERVICES', label: 'HAIR REMOVAL SERVICES' },
  { value: 'NAIL_AND_HAND_CARE', label: 'NAIL AND HAND CARE' },
  { value: 'ANTI_AGING_AND_REJUVENATION', label: 'ANTI AGING AND REJUVENATION' },
  { value: 'MAKEUP_AND_COSMETIC_ENHANCEMENTS', label: 'MAKEUP AND COSMETIC ENHANCEMENTS' },
];

const treatments = [
  { value: 'SKIN_CARE_TREATMENTS', label: 'SKIN CARE TREATMENTS', image: 'https://plus.unsplash.com/premium_photo-1679046948909-ab47e96082e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2tpbmNhcmV8ZW58MHx8MHx8fDA%3D' },
  { value: 'BODY_TREATMENTS', label: 'BODY TREATMENTS', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9keSUyMHRyZWF0bWVudHN8ZW58MHx8MHx8fDA%3D' },
  { value: 'HAIR_REMOVAL_SERVICES', label: 'HAIR REMOVAL SERVICES', image: 'https://plus.unsplash.com/premium_photo-1664187387097-3bc0d6275fa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVwaWxhemlvbmV8ZW58MHx8MHx8fDA%3D' },
  { value: 'NAIL_AND_HAND_CARE', label: 'NAIL AND HAND CARE', image: 'https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5haWx8ZW58MHx8MHx8fDA%3D' },
  { value: 'ANTI_AGING_AND_REJUVENATION', label: 'ANTI AGING AND REJUVENATION', image: 'https://plus.unsplash.com/premium_photo-1679106767239-95b814bf9795?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNyZW1hfGVufDB8fDB8fHww' },
  { value: 'MAKEUP_AND_COSMETIC_ENHANCEMENTS', label: 'MAKEUP AND COSMETIC ENHANCEMENTS', image: 'https://images.unsplash.com/photo-1620464003286-a5b0d79f32c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1ha2V1cHxlbnwwfHwwfHx8MA%3D%3D' },
];

const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '50px',
      borderColor: '#e9516c', 
      padding: '0.4rem',
      boxShadow: 'none', 
      '&:hover': {
        borderColor: '#e9516c', 
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '5px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
      backgroundColor: '#f9f9f9',
    }),
    option: (provided,state ) => ({
      ...provided,
      backgroundColor: state.isSelected
      ? '#e9516c' 
      : state.isFocused
      ? '#f2d1d9' 
      : 'transparent', 
      transition: 'none', 
      '&:active': {
        backgroundColor: '#e9516c', 
      },
      
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#595C5F', 
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
    color:'#e9516c',
    '&:hover': {
        color: '#e9516c', 
      },
    }),
    indicatorSeparator: () => ({
      display: 'none', 
    }),
  };

const ClientHomePage = () => {
  const dispatch = useDispatch();

  const [searchPerformed, setSearchPerformed] = useState(false);
  const searchData = useSelector((state) => state.home.searchForm);
  const result = useSelector((state) => state.home.searchResult);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const preferiti = useSelector((state) => state.preferiti.preferiti);
  const error = useSelector((state) => state.home.error);

  
  const getAvailableHours = () => {
    const hours = [];
    for (let hour = 9; hour <= 17; hour++) {
      hours.push(`${hour < 10 ? "0" : ""}${hour}:00`);
    }

    const today = new Date();
    const selectedDate = new Date(searchData.dataPrenotazione);

    
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

    return hours; 
  };

  
  useEffect(() => {
    if (accessToken) {
      dispatch(getPreferiti(accessToken));
    }
  }, [dispatch, accessToken]);

  
  useEffect(() => {
    if (searchData.dataPrenotazione && searchData.trattamento && searchData.citta) {
      setSearchPerformed(true);
      dispatch(ricerca(searchData, accessToken)); 
    }
  }, [searchData, dispatch, accessToken]);

 
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  
  const handleCloseError = () => {
    dispatch(resetError());
  };

  
  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setFieldSearch({ id, value }));
  };

  const handleSelectChange = (selectedOption) => {
    dispatch(setFieldSearch({ id: 'trattamento', value: selectedOption ? selectedOption.value : '' }));
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
    const data = searchData.dataPrenotazione + "T" + orario + ":00"; 
    const result = await dispatch(postPrenotazioni(accessToken, item, data));
    if (result) {
      dispatch(ricerca(searchData, accessToken)); 
    }
  };

  
  const isSearchValid =
    searchData.dataPrenotazione &&
    searchData.trattamento &&
    searchData.citta;

  return (
    <Container fluid className="p-4">
    
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong>
        </Alert>
      )}

    
      <Form id="search-form">
        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="trattamento" className="mb-3">
              
               
              <Select
                                options={options}
                                styles={customStyles}
                                placeholder="Treatments"
                                onChange={handleSelectChange}
                                value={options.find((option) => option.value === searchData.trattamento)}
                            />
             
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3 custom-input" controlId="citta">
              <InputGroup>
                
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={searchData.citta}
                  onChange={handleChange}
                  required
                />
                 <InputGroup.Text>
                  <FaMapMarkerAlt />
                </InputGroup.Text>
              </InputGroup>
             
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3 custom-input-date" controlId="dataPrenotazione">
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
       
        {!isSearchValid || !searchPerformed ? ( 
          <>

          {treatments.map((treatment) => (
            <Col xs={12} md={6} xl={4} key={treatment.value}>
              <Card className="custom-static-card">
                <Card.Img
                  variant="top"
                  src={treatment.image}
                  alt={treatment.label}
                  className="w-100 h-100"
                />
                <Card.ImgOverlay>
                  <Card.Title>{treatment.label}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
          </>
        ) : new Date(searchData.dataPrenotazione) < new Date().setHours(0, 0, 0, 0) ? (
        
          <Col xs={12}>
            <p>The selected date is in the past. Please choose a future date to make a booking.</p>
          </Col>

        ) : result.length > 0 ? (
         
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
                <Card className="mb-3 custom-card" style={{ maxWidth: "100%" }}>
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
                            className="d-flex justify-content-between align-items-center custom-color-bg"
                          >
                            <span>{hour}</span>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleSaveRes(item, hour)}
                              className="custom-button-ds"
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
          
          <Col xs={12}>
            <p>No results found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ClientHomePage;
