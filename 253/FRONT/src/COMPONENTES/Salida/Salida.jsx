import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"
import css from "./Salida.module.css"
import {getSalidas} from "../../REDUX/ACTIONS/getSalidas"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


export default function Salida() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSalidas());
    }, [dispatch]);

    const Salidas = useSelector((state) => state.Salidas)

    const [selectedSalida, setselectedSalida] = useState(null);
    console.log(selectedSalida)
    const deselectSalida = () => {
        setselectedSalida(null);  // suponiendo que el nombre de tu estado es `selectedRes` y su valor inicial es `null`.
    };

    const handleSalidaClick = (salidaData) => {  // 2. Función para Seleccionar una Tarjeta
        setselectedSalida(salidaData);
    }




    const calcularKgTotales = (animales) => {
        return animales.reduce((totalKg, res) => totalKg + res.peso, 0);
      };
      

        return (
            <div>
                <Navbar></Navbar>
            
                <div className={css.container}>
                   
                    <div className={css.main}>
                        {Salidas.length ? Salidas.map(salida => (
                            <div key={salida._id} className={css.salidaDiv} onClick={()=> handleSalidaClick(salida)}>
                                <div className={css.divisor}><h3>Fecha </h3> <h5>{new Date(salida.fecha).toLocaleDateString()}</h5></div>
                                <div className={css.divisor}><h3>½ reses</h3> <h5>{salida.animales.length}</h5></div>
                                <div className={css.divisor}><h3>Kg totales</h3> <h5>{calcularKgTotales(salida.animales)}</h5></div>
                                <div className={css.divisor}><h3>Distribuidor</h3> <h5>{salida.distribuidor.nombre}</h5></div>
                            </div>
                        )) :
                        <div className={css.loaderContainer}>
                            <div className={css.loader}></div>
                        </div>
                        }
                    </div>

                    <div className={css.main2}>
                        {selectedSalida ? selectedSalida.animales.map((res) => {
                            return (
                                <div className={css.animalesSalida}>
                                    <div className={css.peso}>
                                        {res.peso}
                                    </div>
                                    <div className={css.tropa}>
                                        <h4>Tropa</h4>
                                      
                                    </div>
                                </div>
                            )
                        }): null }
                    </div>
                </div>
            
            </div>
  
        )
    
}