import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import css from "./SelectedCard.module.css"
import { getDistribuidores } from "../../REDUX/ACTIONS/getDistribuidores"
import { putRes } from "../../REDUX/ACTIONS/putRes";
import { getStock } from "../../REDUX/ACTIONS/getStock.js"

export default function SelectedCard({ data , deselectRes }) {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDistribuidores());
    }, [dispatch])

    const Distribuidores = useSelector((state) => state.Distribuidores)


    const [formData, setFormData] = useState({
        salida: '',
        distribuidor: '',
        
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
        
    
        try {
            await dispatch(putRes(data._id)); 
            dispatch(getStock());
            alert(`Se despacho una nueva res`);
            deselectRes()
            setFormData({
                salida: '',
                distribuidor: '',
            });
        } catch (error) {
            alert('Ocurrió un error al despachar la res. Por favor, verifica los datos y vuelve a intentarlo.');
            console.error("Error al despachar la res:", error);
        }
    }
    

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
                    <div className={css.item}>
                        <h4>
                        Tropa
                    </h4>
                    <h5>
                        {data.tropa.numero}
                    </h5>
                    </div>

                    <div className={css.item}>
                        <h4>
                        Ingreso
                    </h4>
                    <h5>
                    {new Date(data.tropa.fecha_ingreso).toLocaleDateString()}
                    </h5>
                    </div>

                    <div className={css.item}>
                        <h4>
                        Productor
                    </h4>
                    <h5>
                        {data.tropa.productor? data.tropa.productor: "---"}
                    </h5>
                    </div>

                    <div className={css.item}>
                        <h4>
                            Observaciones
                        </h4>
                        <h5>
                            { data.observaciones ? data.observaciones
                        : "---"}
                        </h5>
                    </div>
                    
                    
                        <form className={css.form} onSubmit={handleSubmit}>
                            <div className={css.salida}>
                                <label htmlFor="salida"> Salida</label>
                                <input type="date" name="salida" id="salida" className={css.select}/>
                            </div>
                            <div>
                                <label htmlFor="distribuidor"> Distribuidor</label>
                                <select name="distribuidor" id="distribuidor" className={css.select}>
                                    <option value=""> Seleccionar...</option>
                                    {Distribuidores.map((distribuidor) => (
                                        <option key={distribuidor._id} value={distribuidor._id}>{ distribuidor.nombre}</option>
                                    ))}
                                </select>
                            </div>
                       
                            <button type="submit" className={css.btn}> Marcar salida</button>
                       
                    
                        </form>
                    
                </div>
                
                

                
            </div>
            
        </div>
  
    ) 
}