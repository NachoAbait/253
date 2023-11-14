import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { postLluvia } from "../../../REDUX/ACTIONS/postLluvia";
import { getLluvias } from '../../../REDUX/ACTIONS/getLluvias';

const localizer = momentLocalizer(moment);

const RainCalendar = () => {
  const dispatch = useDispatch();
  const lluvias = useSelector((state) => state.Lluvias);

  useEffect(() => {
    // Cargar lluvias desde la base de datos al montar el componente
    dispatch(getLluvias());
  }, [dispatch]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    if (slotInfo.start) {
      const rainfallInput = prompt(`Ingresa milímetros de lluvia para ${moment(slotInfo.start).format('LL')}:`);
      if (rainfallInput !== null) {
        const rainfall = Number(rainfallInput);

        // Dispatch a la acción para enviar la solicitud al backend
        dispatch(postLluvia(slotInfo.start, rainfall));

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

  console.log('Datos de lluvias en el componente:', lluvias);

  return (
    <div>
      <h2>Calendario de Lluvia</h2>
      <Calendar
        localizer={localizer}
        events={lluvias} // Usa lluvias directamente aquí
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

export default RainCalendar;
