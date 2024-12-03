import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import RegisterBeautyCenterForm from './components/RegisterBeautyCenterForm/RegisterBeautyCenterForm';


import UtenteHome from './components/UtentePages/UtenteHome';


import ClientHomePage from './components/ClientePages/ClientHomePage';
import ClientFavPage from './components/ClientePages/ClientFavPage';
import ClientResPage from './components/ClientePages/ClientResPage';
import ClientProfilePage from './components/ClientePages/ClientProfilePage';


import BeautyCenterHomePage from './components/CentroEsteticoPages/BeautyCenterHomePage';
import BeautyCenterClientsPage from './components/CentroEsteticoPages/BeautyCenterClientsPage';
import BeautyCenterResPage from './components/CentroEsteticoPages/BeautyCenterResPage';
import BeautyCenterProfilePage from './components/CentroEsteticoPages/BeautyCenterProfilePage';

function App() {
 

  


  const [userType, setUserType] = useState(localStorage.getItem("userType") || sessionStorage.getItem("userType"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"));

 
  const handleLogin = (userData) => {
    const { accessToken, userType } = userData;
    setAccessToken(accessToken);
    setUserType(userType);

    
  };

  

  return (
    <BrowserRouter>
      <Container fluid className="h-100">
        <Routes>
          {/* Rotte per login e registrazione */}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/registerBeautyCenter" element={<RegisterBeautyCenterForm />} />

          {/* Rotte protette per utenti autenticati */}
          <Route path="/" element={<UtenteHome />}>
            {/* Rotte per clienti */}
            {userType === 'cliente' && accessToken ? (
              <>
                <Route path="home" element={<ClientHomePage />} />
                <Route path="fav" element={<ClientFavPage />} />
                <Route path="res" element={<ClientResPage />} />
                <Route path="profile" element={<ClientProfilePage />} />
              </>
            ) : null}

            {/* Rotte per centro estetico */}
            {userType === 'centroEstetico' && accessToken ? (
              <>
                <Route path="home" element={<BeautyCenterHomePage />} />
                <Route path="clients" element={<BeautyCenterClientsPage />} />
                <Route path="resBeautyCenter" element={<BeautyCenterResPage />} />
                <Route path="profileBeautyCenter" element={<BeautyCenterProfilePage />} />
              </>
            ) : null}
          </Route>

          {/* Se l'utente non è autenticato, reindirizza a login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
