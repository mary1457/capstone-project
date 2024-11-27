import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getClienti } from '../../redux/actions/centroEsteticoActions'; 
import BeautyCenterHomePage from './BeautyCenterHomePage';

const BeautyCenterClientsPage = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const clients = useSelector((state) => state.centroEstetico.clients); 

  
  useEffect(() => {
    dispatch(getClienti(accessToken));
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

  return (
    <Container fluid className="p-4">
      {Object.keys(groupedClients).sort().map((initial) => (
        <div key={initial}>
          {/* Lettera iniziale */}
          <h2 className="mt-4">{initial}</h2>
          <Row className="g-4">
            {groupedClients[initial].map((client) => (
              <Col xs={12} md={6} xl={4} key={client.id}>
                <Card className="mb-3" style={{ maxWidth: '100%' }}>
                  <Card.Body>
                    <Card.Title>{`${client.cognome} ${client.nome}`}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {client.email}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default BeautyCenterClientsPage;
