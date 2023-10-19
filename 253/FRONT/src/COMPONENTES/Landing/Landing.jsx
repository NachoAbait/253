import React from "react";
import css from "./Landing.module.css"
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    
    let navigate = useNavigate();

    function navigateToHome() {
        navigate('/home');
    }
    
    return (
        <div className={css.container}>
            <div className={css.num}>253</div>
            
             <button className={css.btn} onClick={navigateToHome}>Ingresar </button>
           
        </div>
    )
}


