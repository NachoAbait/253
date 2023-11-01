import React from "react";
import css from "./Navbar.module.css"
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    let navigate = useNavigate();

    function navigateToIngreso() {
        navigate('/ingreso');
    }

    function navigateToStock() {
        navigate('/stock');
    }
    function navigateToTropas() {
        navigate('/tropas');
    }
    function navigateToSalidas() {
        navigate('/salidas');
    }
    
    

    return (
        <div className={css.container}>
            <div className={css.logo}>
                53
            </div>
            <div className={css.lista}>
                <ul>
                    <li onClick={navigateToIngreso}>Ingreso</li>
                    <li onClick={navigateToStock}>Stock</li>
                    <li onClick={navigateToTropas}>Tropas</li>
                    <li onClick={navigateToSalidas}>Salidas</li>
                </ul>
            </div>
        </div>
    )
}

