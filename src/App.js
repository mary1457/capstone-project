import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm'; 
import RegisterForm from './components/RegisterForm/RegisterForm'; 
import { Container, Row,Col } from 'react-bootstrap';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DiNpm } from 'react-icons/di';

import ClientHome from './components/ClientPages/ClientHome';
import ClientHomePage from './components/ClientPages/ClientHomePage';
import ClientFavPage from './components/ClientPages/ClientFavPage';
import ClientResPage from './components/ClientPages/ClientResPage';
import ClientProfilePage from './components/ClientPages/ClientProfilePage';
import BeautyCenterForm from './components/BeautyCenterForm/BeautyCenterForm';

function App() {
  return (
    <BrowserRouter>
    <Container fluid className="h-100">
 
  <Routes>
          {/* Route per la pagina di login */}
          <Route path="/login" element={<LoginForm />} />

          {/* Route per la pagina di registrazione */}
          <Route path="/register" element={<RegisterForm />} />

           {/* Route per la pagina di registrazione */}
           <Route path="/registerBeautyCenter" element={<BeautyCenterForm />} />

          {/* Route per la home del client */}
          <Route path="/" element={<ClientHome />}  >

          
        <Route path="" element={<ClientHomePage />} />
        <Route path="fav" element={<ClientFavPage />} />
        <Route path="res" element={<ClientResPage />} />
        <Route path="profile" element={<ClientProfilePage />} />
      </Route>

         
        </Routes>
    </Container>
    </BrowserRouter>
  );
}

export default App;
