
import { Container, Row, Col, Form, Card, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux'; // Hook per Redux
import { setField,  resetMessages, resetAll, getSearch } from "../../redux/actions/UtenteAction"; // Azioni Redux
import { useNavigate } from 'react-router-dom'; // Hook per la navigazione in React Router
import React, { useEffect } from "react"; // Import di React e hook useEffect

function ClientHomePage() {

  const dispatch = useDispatch(); // Hook per dispatch delle azioni Redux
  const searchData = useSelector((state) => state.utente.searchForm); // Dati del form dal Redux store
  const result = useSelector((state) => state.utente.result); // Risultato della registrazione
  const error = useSelector((state) => state.utente.error); 
  const token = useSelector((state) => state.accessToken.token); // Errori restituiti dal server

  // useEffect per eseguire il reset dei dati quando il componente viene smontato
  useEffect(() => {
    return () => {
      dispatch(resetAll()); // Reset dei dati utente quando il componente è smontato
    };
  }, [dispatch]);

  // Funzione per aggiornare i campi del form
  const handleChange = (e) => {
    const { id, value } = e.target; // Ottieni id e valore del campo
    dispatch(setField({ id, value })); // Dispatch dell'azione per aggiornare il Redux store
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impedisci il comportamento predefinito del form
    await dispatch(getSearch(searchData,token)); // Esegui l'azione di registrazione
    console.log(result); // Stampa il risultato (utile per il debug)
  };

  const navigate = useNavigate(); // Hook per navigazione

  // Funzione per chiudere l'alert di successo e navigare al login
  const handleClose = () => {
    navigate('/login'); // Naviga alla pagina di login
  };

  // Funzione per chiudere l'alert di errore
  const handleCloseError = () => {
    dispatch(resetMessages()); // Resetta i messaggi di errore
  };
  return (
    <Container fluid className="p-4">
      {/* Search Bars */}
      <Row className="mb-4">
      <Form id="search-form" onSubmit={handleSubmit} > {/* Inizio del form */}
        
        
       
            <Col xs={12}   md={10}>

            <Form.Group controlId="trattamenti" className="mb-3">
            <InputGroup>
              <InputGroup.Text>
                  <FaSearch /> {/* Icona utente */}
                </InputGroup.Text>
                <Form.Select
    aria-label="Default select example"
    value={searchData.trattamenti}
    onChange={handleChange}
  >
    <option value="">Open this select menu</option>
    <option value="LASER">LASER</option>
    <option value="DEPILAZIONE">DEPILAZIONE</option>
  </Form.Select>
               
              </InputGroup>
 
</Form.Group>
            
            </Col>
            <Col xs={12} md={10}>
            {/* Campo Cognome */}
            <Form.Group className="mb-3" controlId="city">
              <InputGroup>
              <InputGroup.Text>
                  <FaMapMarkerAlt /> {/* Icona per il cognome */}
                </InputGroup.Text>
                <Form.Control
                  type="text"
                
                  placeholder="City"
                  value={searchData.city}
                  onChange={handleChange}
                  required
                />
               
              </InputGroup>
            </Form.Group>

            </Col>
            <Col xs={12} md={2}>
           

            {/* Bottone per inviare il form */}
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Search
            </Button>
            </Col>

          </Form>
          
         
        
      </Row>

      
       {/* Cards Section */}
       <Row className="g-4">
        {/* Card 1 */}
        <Col xs={12} md={6}  xl={4} key={1}>
          <Card className="text-bg-dark">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150?text=Card+1"
              alt="Card 1"
            />
            <Card.ImgOverlay>
              <Card.Title>Card Title 1</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 2 */}
        <Col xs={12} md={6}  xl={4} key={2}>
          <Card className="text-bg-dark">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150?text=Card+2"
              alt="Card 2"
            />
            <Card.ImgOverlay>
              <Card.Title>Card Title 2</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 3 */}
        <Col xs={12} md={6}  xl={4} key={3}>
          <Card className="text-bg-dark">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150?text=Card+3"
              alt="Card 3"
            />
            <Card.ImgOverlay>
              <Card.Title>Card Title 3</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 4 */}
        <Col xs={12} md={6}  xl={4} key={4}>
          <Card className="text-bg-dark">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150?text=Card+4"
              alt="Card 4"
            />
            <Card.ImgOverlay>
              <Card.Title>Card Title 4</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 5 */}
        <Col xs={12} md={6}  xl={4} key={5}>
          <Card className="text-bg-dark">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150?text=Card+5"
              alt="Card 5"
            />
            <Card.ImgOverlay>
              <Card.Title>Card Title 5</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>

        {/* Card 6 */}
        <Col xs={12} md={6}  xl={4} key={6}>
          <Card className="text-bg-dark">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150?text=Card+6"
              alt="Card 6"
            />
            <Card.ImgOverlay>
              <Card.Title>Card Title 6</Card.Title>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientHomePage;



