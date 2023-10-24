
import Navbar from "../Navbar/Navbar"
import css from "./Stock.module.css"
import Card from "../Card/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getStock } from "../../REDUX/ACTIONS/getStock.js"
import SelectedCard from "../SelectedCard/SelectedCard";

export default function Stock() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getStock());
    }, [dispatch])

    const Stock = useSelector((state) => state.Stock)
    
    const [selectedCard, setSelectedCard] = useState(null);  // 1. Estado Local para el Detalle

    const handleCardClick = (cardData) => {  // 2. Función para Seleccionar una Tarjeta
        setSelectedCard(cardData);
    }

    console.log("selected" , selectedCard)

        return (
            <div>
                <Navbar></Navbar>
            
                <div className={css.container}>
                    <div className={css.filtros}>

                    </div>
                    <div className={css.main}>
                    {Stock.map((res) => (
                        <Card 
                            key={res._id} 
                            tropa={res.tropa} 
                            categoria={res.categoria} 
                            peso={res.peso} 
                            observaciones={res.observaciones} 
                            onClick={() => handleCardClick(res)}  // 3. Manejador de Eventos en las Cards

                        />
                    ))}

                    </div>
                    <div className={css.main2}>
                    {selectedCard && (
                        <SelectedCard data={selectedCard} /> // 4. Renderizar Detalles en `main2`
                    )}
                            
                    </div>
                </div>
            
            </div>
  
        )
    
}