import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setField, resetError, resetAll } from "../../redux/actions/utenteActions";
import { postRegisterBeautyCenter } from '../../redux/actions/centroEsteticoActions';
import { FaUser, FaLock, FaPen, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';
import { Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';

const RegisterBeautyCenterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerBeautyCenter = useSelector((state) => state.centroEstetico.form);
  const result = useSelector((state) => state.centroEstetico.result);
  const error = useSelector((state) => state.centroEstetico.error);

  useEffect(() => {
    return () => {
      dispatch(resetAll());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setField({ id, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(postRegisterBeautyCenter(registerBeautyCenter));
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
          <h1 className="text-center text-dark mb-4">Register your beauty center</h1>
          <Form id="registerBeautyCenter-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Owner's Name"
                  value={registerBeautyCenter.name}
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
                  placeholder="Owner's Surname"
                  value={registerBeautyCenter.surname}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaMapMarkedAlt />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={registerBeautyCenter.email}
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
                  value={registerBeautyCenter.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="nameBeautyCenter">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Beauty Center"
                  value={registerBeautyCenter.nameBeautyCenter}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={registerBeautyCenter.address}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaPen />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={registerBeautyCenter.city}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text>
                  <FaPen />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="trattamenti" className="mb-3">
              <Form.Select
                aria-label="Default select example"
                value={registerBeautyCenter.trattamenti}
                onChange={handleChange}
              >
                <option value="">Treatments</option>
                <option value="LASER">LASER</option>
                <option value="DEPILAZIONE">DEPILAZIONE</option>
              </Form.Select>
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

export default RegisterBeautyCenterForm;
