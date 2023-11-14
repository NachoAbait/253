import React, { useState } from "react";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTrendUp, faCloudRain, faCow } from "@fortawesome/free-solid-svg-icons";
import RainCalendar from "../Calendario/Calendario"; // Asegúrate de ajustar la ruta según la ubicación real del componente

export default function Index() {
  const navigate = useNavigate();

  // Simula datos de lluvia para los eventos del calendario
  const initialEvents = [
    { start: new Date(), end: new Date(), title: "Lluvia", rainfall: 10 },
    // Puedes agregar más eventos según tus necesidades
  ];

  const [events, setEvents] = useState(initialEvents);

  const handleDayClick = (date, rainfall) => {
    // Agrega un nuevo evento al array de eventos
    const newEvent = {
      start: date,
      end: date,
      title: 'Lluvia',
      rainfall: Number(rainfall),
    };

    // Actualiza el estado de los eventos
    setEvents([...events, newEvent]);
  };  

  return (
    <div>
      <Navbar />
      <div className={css.container}>
        <div className={css.sideBar}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{ color: "#ffffff" }} className={css.icono} />
            </li>
            <li>
              <FontAwesomeIcon icon={faCloudRain} style={{ color: "#ffffff" }} className={css.icono} />
            </li>
            <li>
              <FontAwesomeIcon icon={faCow} style={{ color: "#ffffff" }} className={css.icono} />
            </li>
          </ul>
        </div>
        <div className={css.main}>
          <RainCalendar events={events} onDayDoubleClick={handleDayClick}/>
        </div>
      </div>
    </div>
  );
}

