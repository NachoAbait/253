import React from "react";
import css from "./Card.module.css"

export default function Card({ tropa, categoria, peso, observaciones, onClick,  }) {
    console.log(tropa)
    return (
        <div>
            <div className={css.card} onClick={onClick}>
                <div className={css.data1}>
                    <div className={`${css.icono} ${css.responsive}`}>
                        {categoria}
                    </div>
                    <div className={css.peso}>
                        { peso}
                    </div>
                </div>

                <div className={`${css.data2} ${css.responsive}`}>
                    <h4>
                        Productor
                    </h4>
                    <h5>
                        {tropa ? tropa.productor : "---"}
                    </h5>
                   
                </div>
                { observaciones ? <div className={css.alert}>
                    ⚠
                </div>: null}
                

                
            </div>
            
        </div>
  
    ) 
}