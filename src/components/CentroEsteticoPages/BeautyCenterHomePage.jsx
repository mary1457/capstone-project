import React, { useState, useEffect } from 'react';
import { Container, Row, Alert, Spinner } from 'react-bootstrap'; // Aggiunto Alert e Spinner per gestire gli errori e il caricamento
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCalendar, resetError } from '../../redux/actions/prenotazioniActions';

const BeautyCenterHomePage = () => {
  // Localizzazione del calendario con moment.js
  const localizer = momentLocalizer(moment);

  // Definizione del dispatch per le azioni Redux
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const eventi = useSelector((state) => state.prenotazioni.eventi);
  const error = useSelector((state) => state.prenotazioni.error); // Stato dell'errore
  const [loading, setLoading] = useState(true); // Stato per la gestione del caricamento

  // Stato per memorizzare gli eventi formattati per il calendario
  const [events, setEvents] = useState([]);

  // Effetto per recuperare gli eventi quando il componente viene montato
  useEffect(() => {
    if (accessToken) {
      dispatch(getCalendar(accessToken)); // Recupera tutti gli eventi dal backend
    }
  }, [dispatch, accessToken]);

  // Effetto per formattare gli eventi e gestire lo stato di caricamento
  useEffect(() => {
    if (eventi && eventi.length > 0) {
      const formattedEvents = eventi.map((event) => ({
        start: new Date(event.data), // Imposta l'inizio dell'evento
        end: new Date(new Date(event.data).getTime() + 60 * 60 * 1000), // Imposta la fine dell'evento (+1 ora)
        title: event.cliente.nome, // Titolo evento con nome del cliente
        resource: event.cliente.email, // Email del cliente come risorsa
      }));
      setEvents(formattedEvents); // Memorizza gli eventi formattati
    }
    setLoading(false); // Imposta lo stato di caricamento su false dopo aver ricevuto gli eventi
  }, [eventi]); // Trigger dell'effetto quando gli eventi cambiano

  // Stili personalizzati per il calendario
  const calendarStyles = {
    container: {
      height: '600px', // Altezza fissa per il calendario
      width: '100%', // Larghezza del calendario
    },
    calendar: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)', // Colonne uguali per la vista settimanale
      gap: '0px',
      overflowX: 'auto', // Permette lo scroll orizzontale su schermi piccoli
    },
    timeContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
    },
  };

  // Funzione per gestire la chiusura dell'alert di errore
  const handleCloseError = () => {
    dispatch(resetError()); // Reset dell'errore nel Redux store
  };

  // Cleanup: Reset dell'errore quando il componente viene smontato
  useEffect(() => {
    return () => {
      dispatch(resetError()); // Reset dell'errore al termine del ciclo di vita del componente
    };
  }, [dispatch]);

  return (
    <Container fluid className="p-4">
      {/* Mostra un alert in caso di errore */}
      {error && error.message && (
        <Alert variant="danger" dismissible onClose={handleCloseError}>
          <strong>{error.message}</strong> {/* Mostra il messaggio di errore */}
        </Alert>
      )}

      {/* Condizione per visualizzare lo spinner solo se i dati non sono ancora caricati */}
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : (
        <div style={calendarStyles.container}>
          {/* Mostra il calendario sempre */}
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={calendarStyles.container}
            messages={{
              today: 'Oggi', // Traduzione per "Today"
              month: 'Mese', // Traduzione per "Month"
              week: 'Settimana', // Traduzione per "Week"
            }}
            defaultView="week" // Imposta la vista predefinita su settimana
            views={['month', 'week']} // Abilita le visualizzazioni mese e settimana
            selectable
            step={60} // Imposta la durata minima per la selezione a 60 minuti
            timeslots={1} // Imposta il numero di slot orari disponibili
            min={new Date(2000, 0, 1, 8, 0)} // Imposta l'orario minimo (8:00)
            max={new Date(2000, 0, 1, 18, 0)} // Imposta l'orario massimo (18:00)
            onSelectSlot={(slotInfo) => console.log('Slot selezionato:', slotInfo)} // Azione su selezione slot
            onNavigate={(date) => console.log(date)} // Azione su navigazione nel calendario
          />
        </div>
      )}
    </Container>
  );
};

export default BeautyCenterHomePage;
