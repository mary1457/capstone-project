import React, { useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import FooterMobile from "../Footer/FooterMobile.jsx";
import FooterMobileBC from "../Footer/FooterMobileBC.jsx";
import FooterDesktop from "../Footer/FooterDesktop.jsx";
import BeautyCenterSidebar from "../Sidebar/BeautyCenterSidebar.jsx";
import ClientSidebar from "../Sidebar/ClientSidebar.jsx";
import { loadAccessTokenFromStorage } from "../../redux/actions/accessTokenActions";
function UtenteHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const userType = useSelector((state) => state.accessToken.userType);
  
  useEffect(() => {

    const fetchProfile = async () => {
   
    const access =await  dispatch(loadAccessTokenFromStorage());
   
    
     
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
      return <FooterMobile />;
    } else if (userType === 'centroEstetico') {
      return <FooterMobileBC />;
    } else {
      return null;
    }
  };

  return (
    <>
      {/* Header */}
      <Row className="text-white text-center p-3 custom-header">
        <Col>
          <h1>GlowBook</h1>
        </Col>
      </Row>

      {/* Body */}
      <Row className="flex-grow-1">
        {/* Contenuto centrale */}
        <Col xs={12} lg={9} xl={10} className=" p-3">
          <Outlet /> {/* Rotte nidificate */}
        </Col>

        {/* Sidebar destra */}
        <Col xs={12} lg={3} xl={2} className=" text-white p-3 d-none d-lg-block custom-sidebar">
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

export default UtenteHome;
