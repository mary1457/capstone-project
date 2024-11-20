import React, { useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setField, postLogin, resetAll, resetMessages } from "../../redux/actions/UtenteAction";
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from "../../redux/actions/AccessTokenAction";

const LoginForm = () => {
  const dispatch = useDispatch(); // Hook Redux per inviare azioni
  const navigate = useNavigate(); // Hook React Router per la navigazione

  // Stato del form di login (email e password)
  const loginData = useSelector((state) => state.utente.form);
  const tokenData = useSelector((state) => state.accessToken.token);

  // Stato per l'utente loggato (se presente) e gli errori
  const utente = useSelector((state) => state.utente.utente);
  const error = useSelector((state) => state.utente.error);

  // Effetto per resettare lo stato utente quando il componente viene smontato
  useEffect(() => {
    return () => {
      dispatch(resetAll()); // Reset completo dello store utente
    };
  }, [dispatch]);

  // Funzione per gestire il cambiamento nei campi del form
  const handleChange = (e) => {
    const { id, value } = e.target; // Prende l'id e il valore del campo modificato
    dispatch(setField({ id, value })); // Aggiorna il campo corrispondente nello stato Redux
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form
    const utenteResult = await dispatch(postLogin(loginData)); // Invia i dati di login al server tramite Redux
    if (utenteResult) {
      dispatch(setToken(utenteResult));
      navigate('/'); // Naviga alla homepage se l'utente è autenticato con successo
    }
  };

  // Funzione per chiudere l'alert degli errori
  const handleCloseError = () => {
    dispatch(resetMessages()); // Reset dei messaggi di errore nello stato Redux
  };

  return (
    <Row className="h-100 d-flex justify-content-center align-items-center">
      {/* Colonna responsiva che contiene il form di login */}
      <Col xs={12} sm={10} md={8} lg={6} xl={4}>

        {/* Mostra un alert in caso di errori */}
        {error.message && (
          <Alert variant="danger" dismissible onClose={handleCloseError}>
            <strong>{error.message}</strong> 
          </Alert>
        )}

        {/* Wrapper del form con bordi, padding e ombra */}
        <div className="p-4 border rounded shadow">

          {/* Titolo della pagina di login */}
          <h1 className="text-center text-dark mb-4">Login</h1>

          {/* Inizio del form */}
          <Form id="login-form" onSubmit={handleSubmit}>

            {/* Campo per l'input dell'email */}
            <Form.Group className="mb-3" controlId="email">
              <InputGroup>
                <Form.Control
                  type="email" // Tipo di input
                  placeholder="Email" // Testo segnaposto
                  value={loginData.email} // Valore dal Redux store
                  onChange={handleChange} // Aggiorna lo stato Redux
                  required // Campo obbligatorio
                />
                {/* Icona accanto al campo di input */}
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Campo per l'input della password */}
            <Form.Group className="mb-3" controlId="password">
              <InputGroup>
                <Form.Control
                  type="password" // Tipo di input
                  placeholder="Password" // Testo segnaposto
                  value={loginData.password} // Valore dal Redux store
                  onChange={handleChange} // Aggiorna lo stato Redux
                  required // Campo obbligatorio
                />
                {/* Icona accanto al campo di input */}
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Opzioni aggiuntive sotto i campi (checkbox e link) */}
            <div className="d-flex justify-content-between mb-3">
              {/* Checkbox "Remember me" */}
              <Form.Check type="checkbox" label="Remember me" />
              {/* Link "Forgot password?" */}
              <a href="#">Forgot password?</a>
            </div>

            {/* Bottone per inviare il form */}
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>

            {/* Link per registrarsi, sotto il bottone */}
            <div className="text-center mt-3">
              <p className="mb-0">
                Don't have an account? <Link to={'/register'}>Register</Link>
              </p>
            </div>
            <div className="text-center">
              <p className="mb-0">
              Are you the owner of a beauty center? <Link to={'/registerBeautyCenter'}>Click here</Link>
              </p>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginForm;
