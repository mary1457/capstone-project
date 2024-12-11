import React, { useState, useEffect } from 'react';
import { Container, Row, Alert, Spinner } from 'react-bootstrap'; 
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Importa il CSS di default

import { useSelector, useDispatch } from 'react-redux';
import { getCalendar, resetError } from '../../redux/actions/prenotazioniActions';

const BeautyCenterHomePage = () => {
  const localizer = momentLocalizer(moment);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const eventi = useSelector((state) => state.prenotazioni.eventi);
  const error = useSelector((state) => state.prenotazioni.error); 
  const [loading, setLoading] = useState(true); 
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getCalendar(accessToken)); 
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (eventi && eventi.length > 0) {
      const formattedEvents = eventi.map((event) => ({
        start: new Date(event.data), 
        end: new Date(new Date(event.data).getTime() + 60 * 60 * 1000), 
        title: event.cliente.nome, 
        resource: event.cliente.email, 
      }));
      setEvents(formattedEvents); 
    }
    setLoading(false); 
  }, [eventi]); 

  const handleCloseError = () => {
    dispatch(resetError()); 
  };

  useEffect(() => {
    return () => {
      dispatch(resetError()); 
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-4">
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> 
        </Alert>
      )}

      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        <div style={{ height: '600px', width: '100%' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            messages={{
              today: 'Oggi', 
              month: 'Mese', 
              week: 'Settimana', 
            }}
            defaultView="week" 
            views={['month', 'week']} 
            selectable
            step={60} 
            timeslots={1} 
            min={new Date(2000, 0, 1, 8, 0)} 
            max={new Date(2000, 0, 1, 19, 0)} 
          />
        </div>
      )}
    </Container>
  );
};

export default BeautyCenterHomePage;
