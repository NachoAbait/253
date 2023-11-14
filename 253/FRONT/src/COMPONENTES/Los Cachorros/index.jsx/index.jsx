import React, { useState } from "react";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTrendUp, faCloudRain, faCow, faListCheck} from "@fortawesome/free-solid-svg-icons";
import RainCalendar from "../Calendario/Calendario"; // Asegúrate de ajustar la ruta según la ubicación real del componente
import Movimientos from "../Movimientos/Movimientos";
import Hacienda from "../Hacienda/Hacienda";
import Inversiones from "../Inversiones/Inversiones";

export default function Index() {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Aquí puedes realizar otras acciones relacionadas con la opción seleccionada, si es necesario.
  };
  const iconClasses = {
    faMoneyBillTrendUp: selectedOption === "faMoneyBillTrendUp" ? css.selected : "",
    faCloudRain: selectedOption === "faCloudRain" ? css.selected : "",
    faCow: selectedOption === "faCow" ? css.selected : "",
    faListCheck: selectedOption === "faListCheck" ? css.selected : ""
  };

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
          
            <li
            onClick={() => handleOptionClick("faListCheck")}
            className={iconClasses.faListCheck}>
              <FontAwesomeIcon icon={faListCheck} style={{color: "#ffffff",}} className={css.icono} />
            </li>
            
  <li
    onClick={() => handleOptionClick("faMoneyBillTrendUp")}
    className={iconClasses.faMoneyBillTrendUp}
  >
    <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{ color: "#ffffff" }} className={css.icono} />
  </li>
  <li
    onClick={() => handleOptionClick("faCloudRain")}
    className={iconClasses.faCloudRain}
  >
    <FontAwesomeIcon icon={faCloudRain} style={{ color: "#ffffff" }} className={css.icono} />
  </li>
  <li
    onClick={() => handleOptionClick("faCow")}
    className={iconClasses.faCow}
  >
    <FontAwesomeIcon icon={faCow} style={{ color: "#ffffff" }} className={css.icono} />
  </li>
</ul>


        </div>
        {selectedOption === "" ? null : (
          <div className={css.main}>
            
            {selectedOption === "faListCheck" && (
              <Movimientos/>
            )}

            {selectedOption === "faCloudRain" && (
              <RainCalendar events={events} onDayDoubleClick={handleDayClick} />
            )}

            {selectedOption === "faMoneyBillTrendUp" && (
              <Inversiones></Inversiones>
            )}

            {selectedOption === "faCow" && (
              <Hacienda></Hacienda>
            )}

        </div>
        )}
        

        
      </div>
    </div>
  );
}

