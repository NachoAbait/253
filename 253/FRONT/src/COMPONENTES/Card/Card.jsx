import React from "react";
import css from "./Card.module.css"

export default function Card() {
    return (
        <div>
            <div className={css.card}>
                <div className={css.data1}>
                    <div className={css.icono}>
                        NO
                    </div>
                    <div className={css.peso}>
                        105
                    </div>
                </div>

                <div className={css.data2}>
                    <h4>
                        Productor
                    </h4>
                    <h5>
                        Frigorifico
                    </h5>
                </div>

                <div className={css.data3}>
                    <h4>
                        Faenado
                    </h4>
                    <h5>
                        10/10/23
                    </h5>
                </div>
                
            </div>
            
        </div>
  
    ) 
}