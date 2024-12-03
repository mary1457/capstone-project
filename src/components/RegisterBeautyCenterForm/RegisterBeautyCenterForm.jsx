import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registrazioneCentroEstetico, setFieldRegisterBc, resetError, resetAll } from '../../redux/actions/centroEsteticoActions';
import { FaUser, FaLock, FaPen, FaEnvelope, FaCity, FaMapMarked, FaStar} from 'react-icons/fa';
import { Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';

const RegisterBeautyCenterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const centroEstetico = useSelector((state) => state.centroEstetico.form);
    const result = useSelector((state) => state.centroEstetico.result);
    const error = useSelector((state) => state.centroEstetico.error);

    useEffect(() => {
        return () => {
            dispatch(resetAll());
        };
    }, [dispatch]);

   
    const handleChange = (e) => {
        const { id, value } = e.target;
        dispatch(setFieldRegisterBc({ id, value }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(registrazioneCentroEstetico(centroEstetico));
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
               
            {result && result.message && (
  <Alert variant="success" dismissible>
    <strong>{result.message}</strong> 
    <Button variant="link" className="btn-close" onClick={handleClose} aria-label="Close" />
  </Alert>
)}

{error && error.message && (
  <Alert variant="danger" dismissible onClose={handleCloseError} >
    <strong>{error.message}</strong> 
  </Alert>
)}

                <div className="p-4 border rounded shadow">
                    <h1 className="text-center text-dark mb-4">Register your beauty center</h1>
                    <Form id="registerBeautyCenter-form" onSubmit={handleSubmit}>
                       
                        <Form.Group className="mb-3" controlId="nome">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Owner's Name"
                                    value={centroEstetico.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <InputGroup.Text>
                                    <FaUser />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        
                        <Form.Group className="mb-3" controlId="cognome">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Owner's Surname"
                                    value={centroEstetico.cognome}
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
                                    value={centroEstetico.email}
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
                                    value={centroEstetico.password}
                                    onChange={handleChange}
                                    required
                                />
                                <InputGroup.Text>
                                    <FaLock />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        
                        <Form.Group className="mb-3" controlId="nomeCentroEstetico">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Beauty Center"
                                    value={centroEstetico.nomeCentroEstetico}
                                    onChange={handleChange}
                                    required
                                />
                                <InputGroup.Text>
                                <FaStar />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                       
                        <Form.Group className="mb-3" controlId="indirizzo">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Address"
                                    value={centroEstetico.indirizzo}
                                    onChange={handleChange}
                                    required
                                />
                                <InputGroup.Text>
                                <FaMapMarked /> 
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                      
                        <Form.Group className="mb-3" controlId="citta">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="City"
                                    value={centroEstetico.citta}
                                    onChange={handleChange}
                                    required
                                />
                                <InputGroup.Text>
                                    <FaCity />  
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                       
                        <Form.Group controlId="trattamento" className="mb-3">
                            <Form.Select
                                aria-label="Default select example"
                                value={centroEstetico.trattamento}
                                onChange={handleChange}
                            >
                                <option value="">Treatments</option>
                                <option value="SKIN_CARE_TREATMENTS">SKIN CARE TREATMENTS</option>
                                <option value="BODY_TREATMENTS">BODY TREATMENTS</option>
                                <option value="HAIR_REMOVAL_SERVICES">HAIR REMOVAL SERVICES</option>
                                <option value="NAIL_AND_HAND_CARE">NAIL AND HAND CARE</option>
                                <option value="ANTI_AGING_AND_REJUVENATION">ANTI AGING AND REJUVENATION</option>
                                <option value="MAKEUP_AND_COSMETIC_ENHANCEMENTS">MAKEUP AND COSMETIC ENHANCEMENTS</option>
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
