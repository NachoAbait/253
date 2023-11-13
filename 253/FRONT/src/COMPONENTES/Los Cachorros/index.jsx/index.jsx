import React from "react";
import css from "./index.module.css"
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoneyBillTrendUp, faCloudRain, faCow } from "@fortawesome/free-solid-svg-icons"
export default function Index() {
    

    return (
        <div>
            <Navbar></Navbar>
            <div className={css.container}>
                <div className={css.sideBar}>
                    <ul>
                        <li><FontAwesomeIcon icon={faMoneyBillTrendUp} style={{ color: "#ffffff", }} className={css.icono} /></li>
                        <li><FontAwesomeIcon icon={faCloudRain} style={{ color: "#ffffff", }} className={css.icono}/></li>
                        <li><FontAwesomeIcon icon={faCow} style={{ color: "#ffffff", }} className={css.icono}/></li>
                        
                    </ul>
                </div>
                <div className={css.main}>
.
                </div>
            </div>
        </div>
       
    )
}


