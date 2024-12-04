import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { FaUser, FaPen, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiloBC, updateProfilo, deleteProfilo, setField } from '../../redux/actions/profiloActions';
import { useNavigate } from 'react-router-dom';

const BeautyCenterProfilePage = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileBc = useSelector((state) => state.profilo.profileBc); 
  console.log("ProfileBC state", profileBc);// Stato per il profilo Beauty Center
  const profileForm = useSelector((state) => state.profilo.profileForm); // Stato del form per l'update
  const accessToken = useSelector((state) => state.accessToken.accessToken); // Access token per autenticazione
  const error = useSelector((state) => state.prenotazioni.error); // Stato degli errori dalla sezione prenotazioni
  const [loading, setLoading] = useState(true); // Stato di caricamento per la gestione della richiesta di dati
  const [showModal, setShowModal] = useState(false); // Stato per mostrare/nascondere il modal

  // Carica il profilo del Beauty Center all'avvio
  useEffect(() => {
 
    if (accessToken) {
      dispatch(getProfiloBC(accessToken));
    }
  }, [dispatch, accessToken]);

  // Sincronizza il profilo con il form
//   useEffect(() => {
//     if (profileBc) {
//       const fieldsToSync = ['nome', 'cognome', 'email']; // Campi da sincronizzare
//       fieldsToSync.forEach((field) => {
//         if (profileBc[field]) {
//           dispatch(setField({ id: field, value: profileBc[field] }));
//         }
//       });
//     }
//   }, [profileBc, dispatch]);

//   // Gestione eliminazione del profilo
//   const handleDelete = () => {
//     dispatch(deleteProfilo(accessToken));
//     navigate('/register'); // Naviga alla pagina di registrazione dopo l'eliminazione
//   };

//   // Gestione del cambiamento nei campi del form
//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     dispatch(setField({ id, value }));
//   };

//   // Gestione dell'aggiornamento del profilo
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateProfilo(profileForm, accessToken));
//     setShowModal(false); // Chiude il modal dopo l'update
//   };

  if (!profileBc) {
    return <div>Loading...</div>; // Mostra caricamento se il profilo non è pronto
  }

  return (
    <Container fluid className="p-4">
      <Row className="g-4 d-flex justify-content-center align-items-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card style={{ width: '100%', padding: '20px' }}>
            <div className="text-center mt-3">
              <Card.Img
                src={profileBc?.avatar} // Immagine avatar del profilo
                alt="Profile"
                className="rounded-circle"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
            <Card.Body className="text-center">
              <Card.Title className="fs-3 mb-3">
                {profileBc?.nome} {profileBc?.cognome} {/* Nome e cognome */}
              </Card.Title>
              <Card.Subtitle className="mb-4 text-muted fs-5">
                {profileBc?.email} {/* Email */}
              </Card.Subtitle>
              
            </Card.Body>
          </Card>
        </Col>

       
      </Row>
    </Container>
  );
};

export default BeautyCenterProfilePage;
