import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Stili predefiniti del calendario
import { useSelector, useDispatch } from 'react-redux';
import { getMonth } from '../../redux/actions/prenotazioniActions';

const BeautyCenterHomePage = () => {
  // Imposta il localizzatore per il calendario usando moment.js
  const localizer = momentLocalizer(moment);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken); // Access token dallo stato globale
  const monthEvents = useSelector((state) => state.prenotazioni.month); // Ottieni gli eventi del mese dallo stato

  // Stato per gli eventi del calendario
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Recupera gli eventi del mese dal backend quando il componente si monta
    dispatch(getMonth(accessToken)); // Invia la richiesta per ottenere gli eventi del mese
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (monthEvents && monthEvents.length > 0) {
      // Mappa gli eventi ricevuti dal backend nel formato richiesto dal calendario
      const formattedEvents = monthEvents.map((event) => ({
        start: new Date(event.data), // Assicurati che il formato della data sia corretto
        end: new Date(new Date(event.data).getTime() + 60 * 60 * 1000), // Imposta la durata dell'evento a 1 ora (modifica come necessario)
        title: event.cliente.nome, // Titolo dell'evento, modificato come necessario
        resource: event.cliente.email, // Modifica con il nome o l'ID del centro estetico, se necessario
      }));

      setEvents(formattedEvents); // Imposta gli eventi nel calendario
    }
  }, [monthEvents]);

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Calendario Trattamenti</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: '100%' }}
        messages={{
          today: 'Oggi',
          month: 'Mese',
          week: 'Settimana',
        }}
        defaultView="week"
        views={['month', 'week']}
        onSelectSlot={(slotInfo) => console.log('Slot selezionato:', slotInfo)}
        selectable
        onNavigate={(date) => console.log(date)} // Aggiungi un onNavigate se desideri catturare la navigazione
        min={new Date(2000, 0, 1, 8, 0)} // Imposta un orario minimo per la vista settimanale
        max={new Date(2000, 0, 1, 20, 0)} // Imposta un orario massimo per la vista settimanale
        step={60} // Imposta il passo per gli slot orari (ad esempio 60 minuti per un'ora)
        showMultiDay={false} // Disabilita la visualizzazione di eventi che si estendono su più giorni
        timeslots={1} // Numero di "slot" di tempo per giorno
      />
    </Container>
  );
};

export default BeautyCenterHomePage;
