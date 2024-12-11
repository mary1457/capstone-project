import React, { useState, useEffect } from 'react'; 
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap'; 
import { useSelector, useDispatch } from 'react-redux';
import { getClienti, resetError } from '../../redux/actions/centroEsteticoActions'; 

const BeautyCenterClientsPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken); 
  const clients = useSelector((state) => state.centroEstetico.clients); 
  const error = useSelector((state) => state.centroEstetico.error); 
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    if (accessToken) {
      dispatch(getClienti(accessToken)); 
    }
  }, [dispatch, accessToken]);

  
  const groupClientsByInitial = (clients) => {
    if (!clients || clients.length === 0) return {}; 
    return clients.reduce((acc, client) => {
      const initial = client.cognome.charAt(0).toUpperCase(); 
      if (!acc[initial]) {
        acc[initial] = []; 
      }
      acc[initial].push(client); 
      return acc;
    }, {});
  };

  
  const groupedClients = groupClientsByInitial(clients);


  const handleCloseError = () => {
    dispatch(resetError()); 
  };

  
  useEffect(() => {
    return () => {
      dispatch(resetError()); 
    };
  }, [dispatch]);

  useEffect(() => {
   
    if (clients !== undefined || error) {
      setLoading(false); 
    }
  }, [clients, error]); 

  return (
    <Container fluid className="p-4">
     
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> 
        </Alert>
      )}

    
      {loading && clients !== undefined && clients.length === 0 ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
       
        Object.keys(groupedClients).length === 0 ? (
         
          <Row className="justify-content-center">
            <Col xs={12}>
              <p>No clients available</p> 
            </Col>
          </Row>
        ) : (
      
          Object.keys(groupedClients).sort().map((initial) => (
            <div key={initial}>
              <h2 className="mt-4">{initial}</h2> 
              <Row className="g-4">
                {groupedClients[initial].map((client) => (
                  <Col xs={12} md={6} xl={4} key={client.id}>
                    <Card className="mb-3 custom-card" style={{ maxWidth: '100%' }}>
                      <Card.Body>
                        <Card.Title>{`${client.cognome} ${client.nome}`}</Card.Title> 
                        <Card.Text>{client.email}</Card.Text> 
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))
        )
      )}
    </Container>
  );
};

export default BeautyCenterClientsPage;
