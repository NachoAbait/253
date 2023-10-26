
import Navbar from "../Navbar/Navbar"
import css from "./Stock.module.css"
import Card from "../Card/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getStock } from "../../REDUX/ACTIONS/getStock.js"
import SelectedCard from "../SelectedCard/SelectedCard";
import { getDistribuidores } from "../../REDUX/ACTIONS/getDistribuidores"

export default function Stock() {
    const dispatch = useDispatch();
    
 

    const Stock = useSelector((state) => state.Stock)
    
   useEffect(() => {
        dispatch(getStock());
    }, [dispatch])
    
    const [selectedCard, setSelectedCard] = useState(null);  // 1. Estado Local para el Detalle

    const deselectRes = () => {
        setSelectedCard(null);  // suponiendo que el nombre de tu estado es `selectedRes` y su valor inicial es `null`.
    };

    const handleCardClick = (cardData) => {  // 2. Función para Seleccionar una Tarjeta
        setSelectedCard(cardData);
    }

    // Calcula el número total de reses en stock
const totalMedias = Stock.length;

// Calcula el total de kg
const totalKg = Stock.reduce((total, res) => total + res.peso, 0);


// Calcula el número de reses entre 0 y 90kg
const menos90 = Stock.filter(res => res.peso <= 90).length;

// Calcula el número de reses más de 90kg pero no más de 100kg
const entre90y100 = Stock.filter(res => res.peso > 90 && res.peso <= 100).length;

// Calcula el número de reses más de 100kg pero no más de 110kg
const entre100y110 = Stock.filter(res => res.peso > 100 && res.peso <= 110).length;

// Calcula el número de reses más de 110kg pero no más de 120kg
const entre110y120 = Stock.filter(res => res.peso > 110 && res.peso <= 120).length;

// Calcula el número de reses más de 120kg pero no más de 130kg
const entre120y130 = Stock.filter(res => res.peso > 120 && res.peso <= 130).length;

    

        return (
            <div>
                <Navbar></Navbar>
            
                <div className={css.container}>
                    <div className={css.filtros}>

                    </div>
                    <div className={css.main}>
                       
                        {Stock.length >= 0 ? Stock.map((res) => (
                            <Card
                                key={res._id}
                                tropa={res.tropa}
                                categoria={res.categoria}
                                peso={res.peso}
                                observaciones={res.observaciones}
                                onClick={() => handleCardClick(res)}  // 3. Manejador de Eventos en las Cards

                            />
                        )) :   <div className={css.loaderContainer}>
                        <div className={css.loader}></div>
                    </div>
                        
                       
                        
                        }
                           
                   

                    </div>

                    <div className={css.main3}>
                        <div>
                            <h3>½ Totales</h3>
                            <h4>{ totalMedias }</h4>
                        </div>
                        <div>
                            <h3>kg Totales</h3>
                            <h4>{ totalKg}</h4>
                        </div>
                        <div>
                            <h3>½ -90</h3>
                            <h4>{menos90}</h4>
                        </div>
                        <div>
                        <h3>½ -100</h3>
                            <h4>{entre90y100}</h4>
                        </div>
                        <div>
                        <h3>½ -110</h3>
                            <h4>{entre100y110}</h4>
                        </div>
                        <div>
                        <h3>½ -120</h3>
                            <h4>{entre110y120 }</h4>
                        </div>
                        <div>
                        <h3>½ -130</h3>
                            <h4>{entre120y130 }</h4>
                        </div>
                    </div>

                    <div className={css.main2}>
                    {selectedCard && (
                        <SelectedCard data={selectedCard} deselectRes={deselectRes} /> // 4. Renderizar Detalles en `main2`
                    )}
                            
                    </div>
                </div>
            
            </div>
  
        )
    
}