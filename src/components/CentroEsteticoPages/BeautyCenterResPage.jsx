import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap'; 
import { useSelector, useDispatch } from 'react-redux';
import { getToday, resetError } from '../../redux/actions/prenotazioniActions'; 

const BeautyCenterResPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken); 
  const today = useSelector((state) => state.prenotazioni.today); 
  const error = useSelector((state) => state.prenotazioni.error); 
  const [loading, setLoading] = useState(true); 
  
 
  useEffect(() => {
    if (accessToken) {
      dispatch(getToday(accessToken)); 
    }
  }, [dispatch, accessToken]);

  
  useEffect(() => {
    if (today !== undefined) {
      setLoading(false); 
    }
  }, [today]); 

  
  const handleCloseError = () => {
    dispatch(resetError()); 
  };

  
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-4">
     
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> 
        </Alert>
      )}

    
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" /> 
        </Row>
      ) : (
      
        <Row className="g-4">
          {today && today.length > 0 ? (
            today.map((res) => (
              <Col xs={12} key={res.id}>
                <Card style={{ width: '100%' }} className='custom-card'>
                  <Card.Body>
                 
                  <Card.Title>
  {new Date(res.data).toLocaleTimeString()} 
</Card.Title>
<Card.Subtitle className="mb-2 text-muted">
  {new Date(res.data).toLocaleDateString()} 
</Card.Subtitle>

                    <Card.Text className="mb-0">
                     
                      {res.cliente.nome}   {res.cliente.cognome}
                    </Card.Text>

                    <Card.Text>
                      
                      {res.cliente.email}
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
      )}
    </Container>
  );
};

export default BeautyCenterResPage;
