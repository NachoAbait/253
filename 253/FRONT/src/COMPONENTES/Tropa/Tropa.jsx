import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"
import css from "./Tropa.module.css"
import { postTropa } from "../../REDUX/ACTIONS/postTropa";
import { getTropas } from "../../REDUX/ACTIONS/getTropas";
import { useDispatch, useSelector } from "react-redux";

export default function Tropa() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTropas());
    }, [dispatch]);

    const Tropas = useSelector((state) => state.Tropas)
    

    const [formData, setFormData] = useState({
        numero: null,
        productor: '',
        cabezas: null,
        kg_totales: null,
        consignatario: '',
        fecha_ingreso: null,
        faena: '',
        precio_compra: null,
        precio_venta: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postTropa(formData));
        setFormData({
        numero: null,
        productor: '',
        cabezas: null,
        kg_totales: null,
        consignatario: '',
        fecha_ingreso: null,
        faena: '',
        precio_compra: null,
        precio_venta: null
        })
        alert("Se creó una nueva tropa")
        dispatch(getTropas());
    }
    

        return (
            <div>
                <Navbar></Navbar>
            
                <div className={css.container}>
                    <div className={css.filtros}>

                    </div>
                    <div className={css.main}>
  { Tropas.length ? Tropas.map(tropa => (
      <div key={tropa._id} className={css.tropaDiv}>
          

        <div className={css.divisor}><h3>Fecha Ingreso</h3> <h5>{new Date(tropa.fecha_ingreso).toLocaleDateString()}</h5></div>
        <div className={css.divisor}><h3>Número</h3><h5>{tropa.numero}</h5> </div>
      <div className={css.divisor}><h3>Productor</h3> <h5>{tropa.productor}</h5></div>
      <div className={css.divisor}><h3>Cabezas</h3> <h5>{tropa.cabezas}</h5></div>
      
      <div className={css.divisor}><h3>Kg totales</h3> <h5>{tropa.kg_totales}</h5></div>
      <div className={css.divisor}><h3>Consignatario</h3> <h5>{tropa.consignatario}</h5></div>
     
      <div className={css.divisor}><h3>Faena</h3> <h5>{tropa.faena}</h5></div>
      <div className={css.divisor}><h3>Precio Compra</h3> <h5>{tropa.precio_compra}</h5></div>
      <div className={css.divisor}><h3>Precio Venta</h3> <h5>{tropa.precio_venta}</h5></div>
      {/* Agrega aquí cualquier otro dato que quieras mostrar */}
    </div>
  )) :
    <div className={css.loaderContainer}>
        <div className={css.loader}></div>
    </div>
}
</div>

                    <div className={css.main2}>
                    <div className={css.form}>
                    <h1>Ingresar tropa </h1>

                    <form onSubmit={handleSubmit}>
    <div className={css.input}>
        <label htmlFor="tropa">Numero tropa</label>
        <input type="text" name="numero" id="tropa"  value={formData.numero || ''} placeholder="*****" onChange={handleChange} />
    </div>

    <div className={css.input}>
        <label htmlFor="productor">Productor</label>
        <select name="productor" value={formData.productor} id="productor" onChange={handleChange} >
            <option value=""> Seleccionar... </option>
        </select>
    </div>

    <div className={css.input}>
        <label htmlFor="Cabezas">Cabezas</label>
        <input type="number" name="cabezas" id="Cabezas" value={formData.cabezas || ''} placeholder="*****" onChange={handleChange} />
    </div>

    <div className={css.input}>
        <label htmlFor="Kg">Kg totales</label>
        <input type="number" name="kg_totales" id="Kg"  value={formData.kg_totales || ''} placeholder="Kg totales" onChange={handleChange} />
    </div>

    <div className={css.input}>
        <label htmlFor="consignatario">Consignatario</label>
        <input type="text" name="consignatario" value={formData.consignatario || ''} placeholder="Consignatario" onChange={handleChange} />
    </div>

    <div className={css.input}>
        <label htmlFor="ingreso">Ingreso</label>
        <input type="date" name="fecha_ingreso" value={formData.fecha_ingreso || ''} id="ingreso" onChange={handleChange} />
    </div>

    <div className={css.input}>
        <label htmlFor="faena">Tipo faena</label>
        <select name="faena" id="faena" value={formData.faena} onChange={handleChange}>
            <option value=""> Seleccionar... </option>
            <option value="Parcial"> Parcial </option>
            <option value="Total"> Total</option>
        </select>
    </div>

    <div className={css.input}>
        <label htmlFor="costo">Costo Kg</label>
        <input type="number" name="precio_compra" id="costo" value={formData.precio_compra || ''} placeholder="$" onChange={handleChange} />
    </div>

    <div className={css.input}>
        <label htmlFor="venta">Venta Kg</label>
        <input type="number" name="precio_venta" id="venta" placeholder="$"   value={formData.precio_venta || ''} onChange={handleChange} />
    </div>

    <button type="submit" className={css.btn}> Añadir </button>
</form>



                </div>
                    </div>
                </div>
            
            </div>
  
        )
    
}