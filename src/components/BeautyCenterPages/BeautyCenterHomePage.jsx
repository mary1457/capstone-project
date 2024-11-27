import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Stili predefiniti del calendario

const BeautyCenterHomePage = () => {
  // Imposta il localizzatore per il calendario usando moment.js
  const localizer = momentLocalizer(moment);

  // Stato per gli eventi del calendario
  const [events, setEvents] = useState([
    {
      title: 'Manicure',
      start: new Date(2024, 10, 28, 10, 0), // Data e ora in formato Date
      end: new Date(2024, 10, 28, 11, 0),
      resource: 'Centro Estetico A',
    },
    {
      title: 'Trattamento Viso',
      start: new Date(2024, 10, 29, 14, 0),
      end: new Date(2024, 10, 29, 15, 0),
      resource: 'Centro Estetico B',
    },
  ]);

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Calendario Trattamenti</h2>
      <Calendar
        localizer={localizer}
        events={events} // Passa gli eventi al calendario
        startAccessor="start" // Indica la chiave per l'inizio dell'evento
        endAccessor="end" // Indica la chiave per la fine dell'evento
        style={{ height: 500, width: '100%' }} // Altezza e larghezza personalizzate
        messages={{
      
          today: 'Oggi',
          month: 'Mese',
          week: 'Settimana',
        }}
        onSelectEvent={(event) => alert(`Evento selezionato: ${event.title}`)} // Aggiunge un'azione al clic su un evento
        onSelectSlot={(slotInfo) =>
          console.log('Slot selezionato:', slotInfo)
        } // Aggiunge un'azione al clic su una cella vuota
        selectable // Rende cliccabili le celle vuote
      />
    </Container>
  );
};

export default BeautyCenterHomePage;
