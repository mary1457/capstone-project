import { FaUser, FaLock, FaPen, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa'; // Icone per il form
import { Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap'; // Componenti di Bootstrap per il form
import { useSelector, useDispatch } from 'react-redux'; // Hook per Redux
import { setField, postRegister, resetMessages, resetAll } from "../../redux/actions/UtenteAction"; // Azioni Redux
import { useNavigate } from 'react-router-dom'; // Hook per la navigazione in React Router
import React, { useEffect } from "react"; // Import di React e hook useEffect
import { postRegisterBeautyCenter } from '../../redux/actions/CentroEsteticoAction';

const BeautyCenterForm = () => {
  const dispatch = useDispatch(); // Hook per dispatch delle azioni Redux
  const registerData = useSelector((state) => state.centroEstetico.form); // Dati del form dal Redux store
  const result = useSelector((state) => state.centroEstetico.result); // Risultato della registrazione
  const error = useSelector((state) => state.centroEstetico.error); // Errori restituiti dal server

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
    await dispatch(postRegisterBeautyCenter(registerData)); // Esegui l'azione di registrazione
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
    <Row className="h-100 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={10} md={8} lg={6} xl={4}> {/* Colonna responsiva per il form */}

        {/* Mostra l'alert di successo se presente */}
        {result.message && (
          <Alert variant="success" dismissible>
            <strong>{result.message}</strong>
            <Button variant="link" className="btn-close" onClick={handleClose} aria-label="Close" />
          </Alert>
        )}

        {/* Mostra l'alert di errore se presente */}
        {error.message && (
          <Alert variant="danger" dismissible onClose={handleCloseError}>
            <strong>{error.message}</strong>
          </Alert>
        )}

        <div className="p-4 border rounded shadow"> {/* Wrapper del form con bordi e ombra */}
          <h1 className="text-center text-dark mb-4">Register your beauty center</h1> {/* Titolo del form */}
          
          <Form id="registerBeautyCenter-form" onSubmit={handleSubmit}> {/* Inizio del form */}
            
            {/* Campo Nome Centro Estetico */}
            <Form.Group className="mb-3" controlId="name">
              <InputGroup>
                <Form.Control
                  type="text" // Tipo di input
                 
                  placeholder="Owner's Name" // Placeholder per il campo
                  value={registerData.name} // Valore del campo dallo stato Redux
                  onChange={handleChange} // Funzione per aggiornare il Redux store
                  required // Campo obbligatorio
                />
                <InputGroup.Text>
                  <FaUser /> {/* Icona per il nome del centro */}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Campo Indirizzo del Centro Estetico */}
            <Form.Group className="mb-3" controlId="surname">
              <InputGroup>
                <Form.Control
                  type="text"
                
                  placeholder="Owner's Surname"
                  value={registerData.surname}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaMapMarkedAlt /> {/* Icona per l'indirizzo */}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Campo Nome del Responsabile */}
           

            {/* Campo Cognome del Responsabile */}
           

            {/* Campo Email */}
            <Form.Group className="mb-3" controlId="email">
              <InputGroup>
                <Form.Control
                  type="email"
                
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaEnvelope /> {/* Icona email */}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Campo Password */}
            <Form.Group className="mb-3" controlId="password">
              <InputGroup>
                <Form.Control
                  type="password"
                
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaLock /> {/* Icona per la password */}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="nameBeautyCenter">
              <InputGroup>
                <Form.Control
                  type="text" // Tipo di input
                  
                  placeholder="Beauty Center" // Placeholder per il campo
                  value={registerData.nameBautyCenter} // Valore del campo dallo stato Redux
                  onChange={handleChange} // Funzione per aggiornare il Redux store
                  required // Campo obbligatorio
                />
                <InputGroup.Text>
                  <FaUser /> {/* Icona utente */}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <InputGroup>
                <Form.Control
                  type="text"
                  
                  placeholder="Address"
                  value={registerData.address}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaPen /> {/* Icona per il cognome */}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="city">
              <InputGroup>
                <Form.Control
                  type="text"
                 
                  placeholder="City"
                  value={registerData.city}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaPen /> {/* Icona per il cognome */}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="trattamenti" className="mb-3">
  <Form.Select
    aria-label="Default select example"
    value={registerData.trattamenti}
    onChange={handleChange}
  >
    <option value="">Open this select menu</option>
    <option value="LASER">LASER</option>
    <option value="DEPILAZIONE">DEPILAZIONE</option>
  </Form.Select>
</Form.Group>

            {/* Bottone per inviare il form */}
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Register
            </Button>

          </Form>
        </div>

      </Col>
    </Row>
  );
};

export default BeautyCenterForm;
