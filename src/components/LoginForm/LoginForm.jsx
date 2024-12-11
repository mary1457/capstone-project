import React, { useState, useEffect } from "react";
import { useNavigate ,Link} from 'react-router-dom';
import { Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setFieldLogin, login, resetError, resetAll } from "../../redux/actions/utenteActions"; 


const LoginForm = ({ onLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginForm = useSelector((state) => state.utente.form);
  const error = useSelector((state) => state.utente.error);

  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setFieldLogin({ id, value }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const utenteLogin = await dispatch(login(loginForm)); 
    if (utenteLogin) {
      const { accessToken, userType } = utenteLogin;
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem('accessToken', accessToken);
      storage.setItem('userType', userType);
      onLogin(utenteLogin); 
      navigate('/home'); 
    }
  };

  const handleCloseError = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    return () => {
      dispatch(resetAll()); 
    };
  }, [dispatch]);

  return (
    <Row className="h-100 d-flex justify-content-center align-items-center">
      <Col xs={12} sm={10} md={8} lg={6} xl={4}>
        {error && error.message && (
          <Alert variant="danger" dismissible onClose={handleCloseError} >
            <strong>{error.message}</strong>
          </Alert>
        )}

        <div className="p-4 custom-border">
          <h1 className="text-center text-dark mb-4">Login</h1>
          <Form id="login-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 custom-input" controlId="email">
              <InputGroup >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3 custom-input" controlId="password">
              <InputGroup >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <Form.Check
                type="checkbox"
                label="Remember me"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="custom-checkbox"
              />
              <a href="#" className="custom-link">Forgot password?</a>
            </div>

            <Button variant="primary" type="submit" className="w-100 custom-button">
              Login
            </Button>

            <div className="text-center mt-3">
              <p className="mb-0">
                Don't have an account? <Link to={'/register'} className="custom-link">Register</Link>
              </p>
            </div>

            <div className="text-center">
              <p className="mb-0">
                Are you the owner of a beauty center? <Link to={'/registerBeautyCenter'} className="custom-link">Click here</Link>
              </p>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginForm;
