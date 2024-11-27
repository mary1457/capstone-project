import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { getPrenotazioni, deletePrenotazioni } from '../../redux/actions/prenotazioniActions'; 
import { useNavigate } from 'react-router-dom';

const ClientResPage = () => {
    const dispatch = useDispatch();
    const prenotazioni = useSelector((state) => state.prenotazioni.prenotazioni);
    const accessToken = useSelector((state) => state.accessToken.accessToken);
    const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(getPrenotazioni(accessToken));
    }, [dispatch, accessToken]);

    const handleDelete = (id) => {
      dispatch(deletePrenotazioni(accessToken, id));
    };

    // Ordina le prenotazioni per data in modo crescente
    const sortedPrenotazioni = prenotazioni 
      ? [...prenotazioni].sort((a, b) => new Date(a.data) - new Date(b.data)) 
      : [];

    return (
      <Container fluid className="p-4">
        <Row className="g-4">
          {sortedPrenotazioni && sortedPrenotazioni.length > 0 ? (
            sortedPrenotazioni.map((res) => (
              <Col xs={12} key={res.id}>
                <Card style={{ width: '100%' }}>
                  <Card.Body>
                    <Card.Title>{res.centroEstetico.trattamento.replace(/_/g, " ")}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{new Date(res.data).toLocaleString()}</Card.Subtitle>
                    <Card.Text className='mb-0'>
                      {res.centroEstetico.nomeCentroEstetico}
                    </Card.Text>
                    <Card.Text>
                      {res.centroEstetico.indirizzo}, {res.centroEstetico.citta}
                    </Card.Text>
                    <div className="d-flex justify-content-end mt-2">
                      <Button 
                        variant="danger" 
                        onClick={() => handleDelete(res.id)} 
                        className="d-flex justify-content-center align-items-center"
                      >
                        <FaTrashAlt />
                      </Button>
                    </div>
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

export default ClientResPage;
