import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilo } from '../../redux/actions/profiloActions.js';
import FooterMobile from "../Footer/FooterMobile.jsx";
import FooterMobileBC from "../Footer/FooterMobileBC.jsx";
import FooterDesktop from "../Footer/FooterDesktop.jsx";
import BeautyCenterSidebar from "../Sidebar/BeautyCenterSidebar.jsx";
import ClientSidebar from "../Sidebar/ClientSidebar.jsx";

function ClientHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  console.log('Token nel Redux store:', accessToken);  
  const userType = useSelector((state) => state.accessToken.userType); 

  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) {
        navigate('/login');
        return;
      }

      const result = await dispatch(getProfilo(accessToken));
      if (!result) {
        navigate('/login');
      }
    };

    fetchProfile();
  }, [dispatch, accessToken, navigate]);

  
  const renderSidebar = () => {
    if (userType === 'cliente') {
      return <ClientSidebar />;
    } else if (userType === 'centroEstetico') {
      return <BeautyCenterSidebar />;
    } else {
      return null; 
    }
  };

  const renderFooter = () => {
    if (userType === 'cliente') {
      return <FooterMobile/>;
    } else if (userType === 'centroEstetico') {
      return <FooterMobileBC />;
    } else {
      return null; 
    }
  };

  return (
    <>
      {/* Header */}
      <Row className="bg-primary text-white text-center p-3">
        <Col>
          <h1>{userType === 'cliente' ? "Client Dashboard" : "Beauty Center Dashboard"}</h1>
        </Col>
      </Row>

      {/* Body */}
      <Row className="flex-grow-1">
        {/* Contenuto centrale */}
        <Col xs={12} lg={9} xl={10} className="bg-light p-3">
          <Outlet /> {/* Rotte nidificate */}
        </Col>

        {/* Sidebar destra */}
        <Col xs={12} lg={3} xl={2} className="bg-secondary text-white p-3 d-none d-lg-block">
          {renderSidebar()}
        </Col>
      </Row>

      {/* Footer */}
      <Row className="bg-dark text-white text-center p-3">
        <Col>
        {renderFooter()}
          <FooterDesktop />
        </Col>
      </Row>
    </>
  );
}

export default ClientHome;
