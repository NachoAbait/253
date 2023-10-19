import React from "react";
import Navbar from "../Navbar/Navbar"
import css from "./Ingreso.module.css"


export default function Ingreso() {
    return (
        <div>
            <Navbar></Navbar>
            <div className={css.container}>
            
                <div className={css.form}>
                    <h1>Ingreso de tropa</h1>    
                </div>
                
                
                <div className={css.form}>
                    <h1>Ingreso de ½ </h1>

                    <form>

                    <div className={css.input}>
                            <label for="productor">Productor</label>
                            <input type="date" id="productor" placeholder="Productor..."/>
                        </div>
                        <div className={css.input}>
                            <label for="tropa">Tropa</label>
                            <input type="text" id="tropa" placeholder="Tropa..."/>
                        </div>

                        <div className={css.input}>
                            <label for="animal">Animal</label>
                            <select name="animal" id="animal">
                                <option value="NTO">Seleccionar...</option>
                                <option value="NTO">Novillo</option>
                                <option value="NTO">Novillito</option>
                                <option value="NTO">Vaca</option>
                                <option value="NTO">Vaquillona</option>
                            </select>
                        </div>

                        <div className={css.input}>
                            <label for="Kg">Kg</label>
                            <input type="number" id="Kg" placeholder="Kg..."/>
                        </div>

                        <div className={css.input}>
                            <label for="faena">Fecha faena</label>
                            <input type="date" id="faena" placeholder="Fecha faena..."/>
                        </div>

                        <button type="submit" className={css.btn}> Guardar </button>
                    </form>


                </div>
               
            </div>
        </div>
        
    ) 
}