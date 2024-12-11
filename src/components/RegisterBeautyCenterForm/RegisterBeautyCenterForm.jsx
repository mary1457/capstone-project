import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registrazioneCentroEstetico, setFieldRegisterBc, resetError, resetAll } from '../../redux/actions/centroEsteticoActions';
import { FaUser, FaLock, FaPen, FaEnvelope, FaCity, FaMapMarked, FaStar} from 'react-icons/fa';
import { Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';

import Select from 'react-select';

const options = [
  { value: 'SKIN_CARE_TREATMENTS', label: 'SKIN CARE TREATMENTS' },
  { value: 'BODY_TREATMENTS', label: 'BODY TREATMENTS' },
  { value: 'HAIR_REMOVAL_SERVICES', label: 'HAIR REMOVAL SERVICES' },
  { value: 'NAIL_AND_HAND_CARE', label: 'NAIL AND HAND CARE' },
  { value: 'ANTI_AGING_AND_REJUVENATION', label: 'ANTI AGING AND REJUVENATION' },
  { value: 'MAKEUP_AND_COSMETIC_ENHANCEMENTS', label: 'MAKEUP AND COSMETIC ENHANCEMENTS' },
];

const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '50px',
      borderColor: '#e9516c', 
      padding: '0.4rem',
      boxShadow: 'none', 
      '&:hover': {
        borderColor: '#e9516c', 
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '5px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
      backgroundColor: '#f9f9f9',
    }),
    option: (provided,state ) => ({
      ...provided,
      backgroundColor: state.isSelected
      ? '#e9516c' 
      : state.isFocused
      ? '#f2d1d9' 
      : 'transparent', 
      transition: 'none', 
      '&:active': {
        backgroundColor: '#e9516c', 
      },
      
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#595C5F', 
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
    color:'#e9516c',
    '&:hover': {
        color: '#e9516c', 
      },
    }),
    indicatorSeparator: () => ({
      display: 'none', 
    }),
  };
  

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

    const handleSelectChange = (selectedOption) => {
        dispatch(setFieldRegisterBc({ id: 'trattamento', value: selectedOption ? selectedOption.value : '' }));
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
                    <Alert variant="danger" dismissible onClose={handleCloseError}>
                        <strong>{error.message}</strong> 
                    </Alert>
                )}

                <div className="p-4 custom-border">
                    <h1 className="text-center text-dark mb-4">Register your beauty center</h1>
                    <Form id="registerBeautyCenter-form" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 custom-input" controlId="nome">
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

                        <Form.Group className="mb-3 custom-input" controlId="cognome">
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

                        <Form.Group className="mb-3 custom-input" controlId="email">
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

                        <Form.Group className="mb-3 custom-input" controlId="password">
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

                        <Form.Group className="mb-3 custom-input" controlId="nomeCentroEstetico">
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

                        <Form.Group className="mb-3 custom-input" controlId="indirizzo">
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

                        <Form.Group className="mb-3 custom-input" controlId="citta">
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
                            <Select
                                options={options}
                                styles={customStyles}
                                placeholder="Treatments"
                                onChange={handleSelectChange}
                                value={options.find((option) => option.value === centroEstetico.trattamento)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 custom-button">
                            Register
                        </Button>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default RegisterBeautyCenterForm;
