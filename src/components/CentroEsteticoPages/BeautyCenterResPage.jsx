import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPreferiti,
  deletePreferiti,
  getPreferiti,
} from '../../redux/actions/preferitiActions';
import { getToday } from '../../redux/actions/prenotazioniActions';

const BeautyCenterResPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken); // Access token dallo stato globale
  const today = useSelector((state) => state.prenotazioni.today); 

 
  useEffect(() => {
    dispatch(getToday(accessToken));
  }, [dispatch, accessToken]);

  
  return (
    <Container fluid className="p-4">
      <Row className="g-4">
      {today && today.length > 0 ? (
            today.map((res) => (
              <Col xs={12}  key={res.id}>
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Card.Title> {res.centroEstetico.trattamento.replace(/_/g, " ")}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{new Date(res.data).toLocaleString()}</Card.Subtitle>
                    <Card.Text className='mb-0'>
                  
                    
                    {res.centroEstetico.nomeCentroEstetico}
                    </Card.Text>

                    <Card.Text>
                    
                    {res.centroEstetico.indirizzo}, {res.centroEstetico.citta}
                    </Card.Text>
                   
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p>No reservations found</p> 
            </Col>
          )}
        
      </Row>
    </Container>
  );
};

export default BeautyCenterResPage;
