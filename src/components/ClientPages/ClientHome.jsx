import React from "react";
import { Row, Col } from "react-bootstrap";
import ClientHomePage from "./ClientHomePage";
import FooterMobile from "../Footer/FooterMobile"
import ClientSidebar from "../Sidebar/ClientSidebar";
import FooterDesktop from "../Footer/FooterDesktop"
import ClientFavPage from "./ClientFavPage.jsx";
import ClientResPage from "./ClientResPage.jsx";
import ClientProfilePage from "./ClientProfilePage.jsx";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

function ClientHome() {
  return (
    <>
      {/* Header */}
      <Row className="bg-primary text-white text-center p-3">
        <Col>
          <h1>Header</h1>
        </Col>
      </Row>

      {/* Body */}
      <Row className="flex-grow-1">
        

        {/* Contenuto centrale */}
        <Col xs={12} lg={9} className="bg-light p-3">

       
   
 <Outlet>   </Outlet>
 
         

         
       
  
   
  
        </Col>

        {/* Sidebar destra */}
        <Col xs={12} lg={3} className="bg-secondary text-white p-3 d-none d-lg-block">
          <ClientSidebar></ClientSidebar>
        </Col>
      </Row>

      {/* Footer */}
      <Row className="bg-dark text-white text-center p-3">
        <Col>
        <FooterMobile></FooterMobile>
        <FooterDesktop></FooterDesktop>
        </Col>
      </Row>
    </>
  );
}

export default ClientHome;




