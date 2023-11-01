import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"
import css from "./DetalleTropa.module.css"

import { getDetalleTropa } from "../../REDUX/ACTIONS/getDetalleTropa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

export default function DetalleTropa() {
    const dispatch = useDispatch();

    const { id } = useParams();

    const Tropa = useSelector((state) => state.DetalleTropa)

    const gruposDeAnimales = {
          '-90': [],
          '-100': [],
          '-110': [],
          '-120': [],
          '+120': [],
        };
        console.log("a",gruposDeAnimales)
    if (Tropa.animales) {
        Tropa.animales.forEach((animal) => {
          if (animal.peso < 90 ) {
            gruposDeAnimales['-90'].push(animal);
          } else if (animal.peso > 90 && animal.peso <= 100) {
            gruposDeAnimales['-100'].push(animal);
          } else if (animal.peso > 100 && animal.peso <= 110) {
            gruposDeAnimales['-110'].push(animal);
          } else if (animal.peso > 110 && animal.peso <= 120) {
            gruposDeAnimales['-120'].push(animal);
          } else if (animal.peso > 120) {
            gruposDeAnimales['+120'].push(animal);
          }
        });
      
        // Luego, representas los grupos en las columnas en tu JSX
      } else {
        // Manejar el caso en el que Tropa.animales no está definida o es undefined
      }
      
      

    useEffect(() => {
        dispatch(getDetalleTropa(id));
    }, [dispatch]);


        return (
            <div>
                <Navbar></Navbar>
            
                <div className={css.container}>
                    <div className={css.maine}>
                        {Tropa._id ?
                            <div className={css.datos}>   
                                <div className={css.dato}>
                                    <h3>
                                        Productor
                                    </h3>
                                    <h4>
                                        {Tropa.productor}
                                    </h4>
                                </div>
                                <div className={css.dato}>
                                    <h3>
                                        Tropa
                                    </h3>
                                    <h4>
                                        {Tropa.numero}
                                    </h4>
                                </div>
                                <div className={css.dato}>
                                    <h3>
                                        Cantidad de cabezas
                                    </h3>
                                    <h4>
                                        {Tropa.cabezas}
                                    </h4>
                                </div>
                                <div className={css.dato}>
                                    <h3>
                                        ½ Reses
                                    </h3>
                                    <h4>
                                        {Tropa.cabezas / 2}
                                    </h4>
                                </div>
                                <div className={css.dato}>
                                    <h3>
                                        Fecha ingreso
                                    </h3>
                                    <h4>
                                        { new Date(Tropa.fecha_ingreso).toLocaleDateString() }
                                    </h4>
                                </div>
                                 <div className={css.dato}>
                                    <h3>
                                        Kg totales
                                    </h3>
                                    <h4>
                                        {Tropa.kg_totales}
                                    </h4>
                                </div>
                                
                                
                                <div className={css.dato}>
                                    <h3>
                                        Faena
                                    </h3>
                                    <h4>
                                        {Tropa.faena}
                                    </h4>
                                </div>
                               
                               <div className={css.dato}>
                                    <h3>
                                        Consignatario
                                    </h3>
                                    <h4>
                                        {Tropa.consignatario}
                                    </h4>
                                </div>
                                <div className={css.finanza}>
                                     <div className={css.dato}>
                                    <h3>
                                        Precio compra
                                    </h3>
                                    <h4 className={css.gasto}>
                                        ${Tropa.precio_compra}
                                    </h4>
                                </div>
                                <div className={css.dato}>
                                    <h3 >
                                        Recupero
                                    </h3>
                                    <h4 className={css.gasto}>
                                        ${Tropa.faena}
                                    </h4>
                                </div>
                                <div className={css.dato}>
                                    <h3>
                                        Precio venta
                                    </h3>
                                    <h4>
                                        ${Tropa.precio_venta}
                                    </h4>
                                </div>
                                <div className={css.dato}>
                                    <h3>
                                        Diferencia
                                    </h3>
                                    <h4 className={css.profit}>
                                            ${Tropa.precio_venta - Tropa.precio_compra} / ${Tropa.kg_totales * Tropa.precio_venta - Tropa.precio_compra }
                                    </h4>
                                </div>
                                </div>
                               
                                <div className={css.animales}>
                                    <div className={css.columna}>
                                        <div className={css.rango}>-90</div>
                                        <div className={css.list}>
                                            { gruposDeAnimales['-90'].map((animal) => (
                                                <div key={animal._id} className={`${css.res} ${animal.estado === 'despachada' ? css.despachado : ''}`}>{animal.peso}</div>
                                            ))}
                                        </div>
                                        <div className={css.infoCol}>
                                            <h4>{gruposDeAnimales["-90"].length} <span className={css.span}>½</span></h4>
                                            <h4>{gruposDeAnimales["-90"].reduce((total, res) => total + res.peso, 0)} <span className={css.span} >Kg</span></h4>
                                        </div>

                                    </div>
                                    
                                    <div className={css.columna}>
                                        <div className={css.rango}>-100</div>
                                        <div className={css.list}>
                                            { gruposDeAnimales['-100'].map((animal) => (
                                                <div key={animal._id} className={`${css.res} ${animal.estado === 'despachada' ? css.despachado : ''}`}>{animal.peso}</div>
                                            ))}
                                        </div>
                                        <div className={css.infoCol}>
                                            <h4>{gruposDeAnimales["-90"].length} <span className={css.span}>½</span> </h4>
                                            <h4>{gruposDeAnimales["-90"].reduce((total, res) => total + res.peso, 0)} <span className={css.span}>Kg</span></h4>
                                        </div>
                                    </div>
                                    <div className={css.columna}>
                                        <div className={css.rango}>-110</div>
                                        <div className={css.list}>
                                            { gruposDeAnimales['-110'].map((animal) => (
                                                <div key={animal._id} className={`${css.res} ${animal.estado === 'despachada' ? css.despachado : ''}`}>{animal.peso}</div>
                                            ))}
                                        </div>
                                        <div className={css.infoCol}>
                                            <h4>{gruposDeAnimales["-90"].length} <span className={css.span}>½</span> </h4>
                                            <h4>{gruposDeAnimales["-90"].reduce((total, res) => total + res.peso, 0)} <span className={css.span}>Kg</span></h4>
                                        </div>
                                    </div>
                                    <div className={css.columna}>
                                        <div className={css.rango}>-120</div>
                                        <div className={css.list}>
                                            { gruposDeAnimales['-120'].map((animal) => (
                                                <div key={animal._id} className={`${css.res} ${animal.estado === 'despachada' ? css.despachado : ''}`}>{animal.peso}</div>
                                            ))}
                                        </div>
                                        <div className={css.infoCol}>
                                            <h4>{gruposDeAnimales["-90"].length} <span className={css.span}>½</span> </h4>
                                            <h4>{gruposDeAnimales["-90"].reduce((total, res) => total + res.peso, 0)} <span className={css.span}>Kg</span></h4>
                                        </div>
                                    </div>
                                    <div className={css.columna}>
                                        <div className={css.rango}>+120</div>
                                        <div className={css.list}>
                                            { gruposDeAnimales['+120'].map((animal) => (
                                                <div key={animal._id} className={`${css.res} ${animal.estado === 'despachada' ? css.despachado : ''}`}>{animal.peso}</div>
                                            ))}
                                        </div>
                                        <div className={css.infoCol}>
                                            <h4>{gruposDeAnimales["+120"].length} <span className={css.span}>½</span> </h4>
                                            <h4>{gruposDeAnimales["+120"].reduce((total, res) => total + res.peso, 0)} <span className={css.span}>Kg</span></h4>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            
                        :
                            <div className={css.loaderContainer}>
                                <div className={css.loader}></div>
                            </div>
                        }  
                    </div>
                   
                </div>
            
            </div>
  
        )
    
}