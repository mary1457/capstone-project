import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaPen, FaEnvelope } from 'react-icons/fa'; 
import { Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap'; 
import { setField, postRegister, resetMessages, resetAll, resetError } from "../../redux/actions/utenteActions"; 

const RegisterForm = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const register = useSelector((state) => state.utente.form);
  const result = useSelector((state) => state.utente.result);
  const error = useSelector((state) => state.utente.error);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setField({ id, value })); 
  };

  useEffect(() => {
    return () => {
      dispatch(resetAll()); 
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await dispatch(postRegister(register)); 
  };

  const handleClose = () => {
    navigate('/login'); 
  };

  const handleCloseError = () => {
    dispatch(resetError()); 
  };

  return (
    <Row className="h-100 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={10} md={8} lg={6} xl={4}>

        {result.message && (
          <Alert variant="success" dismissible>
            <strong>{result.message}</strong> 
            <Button variant="link" className="btn-close" onClick={handleClose} aria-label="Close" />
          </Alert>
        )}

        {error.message && (
          <Alert variant="danger" dismissible onClose={handleCloseError}>
            <strong>{error.message}</strong> 
          </Alert>
        )}

        <div className="p-4 border rounded shadow">
          <h1 className="text-center text-dark mb-4">Register</h1>
          
          <Form id="register-form" onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="name">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={register.name}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Surname"
                  value={register.surname}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaPen />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={register.email}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaEnvelope />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <InputGroup>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={register.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Register
            </Button>

          </Form>
        </div>

      </Col>
    </Row>
  );
};

export default RegisterForm;
