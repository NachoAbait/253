// RainCalendar.js
import React, { useState , useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { postLluvia } from "../../../REDUX/ACTIONS/postLluvia" 

const localizer = momentLocalizer(moment);

const RainCalendar = ({ events, postLluvia }) => {

  useEffect(() => {
    // Cargar lluvias desde la base de datos al montar el componente
    getLluvias();
  }, [getLluvias]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    if (slotInfo.start) {
      const rainfallInput = prompt(`Ingresa milímetros de lluvia para ${moment(slotInfo.start).format('LL')}:`);
      if (rainfallInput !== null) {
        const rainfall = Number(rainfallInput);

        // Dispatch a la acción para enviar la solicitud al backend
        postLluvia(slotInfo.start, rainfall);

        // Resto del código...
      }
    }
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: '#3174ad',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
      textAlign: 'center',
    },
  });

  const EventPopup = ({ event }) => (
    <div>
      {event.rainfall !== undefined && (
        <div>
          <div>{`${event.rainfall} mm`}</div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Calendario de Lluvia</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: '500px' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventPopup,
        }}
      />
    </div>
  );
};

export default connect(null, { postLluvia })(RainCalendar);
