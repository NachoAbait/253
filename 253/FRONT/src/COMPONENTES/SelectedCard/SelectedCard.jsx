import React from "react";
import css from "./SelectedCard.module.css"

export default function SelectedCard({ data }) {
    

    return (
        <div>
            <div className={css.card} >
                <div className={css.data1}>
                    <div className={css.icono}>
                        {data.categoria}
                    </div>
                    <div className={css.peso}>
                        { data.peso}
                    </div>
                </div>

                <div className={css.data2}>
                    <h4>
                        Tropa
                    </h4>
                    <h5>
                        {data.tropa.numero}
                    </h5>
                    
                </div>
                { data.observaciones ? <div className={css.alert}>
                    ⚠
                </div>: null}
                

                
            </div>
            
        </div>
  
    ) 
}