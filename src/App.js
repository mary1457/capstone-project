import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importa useSelector per accedere allo stato Redux

import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import RegisterBeautyCenterForm from './components/RegisterBeautyCenterForm/RegisterBeautyCenterForm';

// Import delle pagine per Cliente
import ClientHome from './components/ClientPages/UtenteHome';
import ClientHomePage from './components/ClientPages/ClientHomePage';
import ClientFavPage from './components/ClientPages/ClientFavPage';
import ClientResPage from './components/ClientPages/ClientResPage';
import ClientProfilePage from './components/ClientPages/ClientProfilePage';

// Import delle pagine per Centro Estetico
import BeautyCenterHomePage from './components/BeautyCenterPages/BeautyCenterHomePage';
import BeautyCenterClientsPage from './components/BeautyCenterPages/BeautyCenterClientsPage';
import BeautyCenterResPage from './components/BeautyCenterPages/BeautyCenterResPage';
import BeautyCenterProfilePage from './components/BeautyCenterPages/BeautyCenterProfilePage';

function App() {
  const userType = useSelector((state) => state.accessToken.userType); // Accedi al tipo di utente

  return (
    <BrowserRouter>
      <Container fluid className="h-100">
        <Routes>
          {/* Rotte per la pagina di login e registrazione */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/registerBeautyCenter" element={<RegisterBeautyCenterForm />} />

          {/* Rotte condizionate per il tipo di utente */}
          {userType === 'cliente' ? (
            <Route path="/" element={<ClientHome />} >
              <Route path="" element={<ClientHomePage />} />
              <Route path="fav" element={<ClientFavPage />} />
              <Route path="res" element={<ClientResPage />} />
              <Route path="profile" element={<ClientProfilePage />} />
            </Route>
          ) : null}

          {userType === 'centroEstetico' ? (
            <Route path="/" element={<ClientHome />} >
              <Route path="" element={<BeautyCenterHomePage />} />
              <Route path="clients" element={<BeautyCenterClientsPage />} />
              <Route path="resBeautyCenter" element={<BeautyCenterResPage />} />
              <Route path="profileBeautyCenter" element={<BeautyCenterProfilePage />} />
            </Route>
          ) : null}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
