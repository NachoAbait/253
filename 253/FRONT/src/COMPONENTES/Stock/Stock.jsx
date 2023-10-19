import React from "react";
import Navbar from "../Navbar/Navbar"
import css from "./Stock.module.css"
import Card from "../Card/Card.jsx";

export default function Stock() {
    const renderCards = () => {
        const cards = []
        for (let i = 0; i < 50; i++) {
            cards.push(<Card key={i} />)
        }
        return cards
    }
        
        return (
            <div>
                <Navbar></Navbar>
            
                <div className={css.container}>
                    <div className={css.filtros}>

                    </div>
                    <div className={css.main}>
                        { renderCards()}
                    </div>
                    <div className={css.main2}>
                    
                    </div>
                </div>
            
            </div>
  
        )
    
}