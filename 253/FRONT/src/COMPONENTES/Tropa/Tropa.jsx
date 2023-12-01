import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"
import css from "./Tropa.module.css"
import { postTropa } from "../../REDUX/ACTIONS/postTropa";
import { getTropas } from "../../REDUX/ACTIONS/getTropas";
import { getProductores } from "../../REDUX/ACTIONS/getProductores"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useAuth } from "../../Context/UserContext";

export default function Tropa() {
    const dispatch = useDispatch();
    const [isAdmin, setIsAdmin] = useState(false);

    const { user } = useAuth()

    useEffect(() => {
        dispatch(getTropas());
        dispatch(getProductores())
        setIsAdmin(user.isAdmin || false);
    }, [dispatch, user.isAdmin]);

    const Tropas = useSelector((state) => state.Tropas)
    const Productores = useSelector((state) => state.Productores); // Obtener la lista de productores
    const sortedTropas = Tropas.slice().sort((a, b) => new Date(b.fecha_ingreso) - new Date(a.fecha_ingreso));

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
            
                <div className={`${isAdmin ? css.container : css.nonAdminContainer}`}>
                    <div className={css.filtros}>

                    </div>
                    <div className={css.main}>
                        {sortedTropas.length ? sortedTropas.map(tropa => (
       <Link to={`/tropas/${tropa._id}`} key={tropa._id} className={css.link}>
      <div key={tropa._id} className={css.tropaDiv}>
          
<div className={css.divisor}><h3>Productor</h3> <h5>{tropa.productor}</h5></div>
        <div className={css.divisor}><h3><span className={css.celular}>Fecha </span>Ingreso</h3> <h5>{new Date(tropa.fecha_ingreso).toLocaleDateString()}</h5></div>
        <div className={`${css.divisor} ${css.celular}`}><h3>Número</h3><h5>{tropa.numero}</h5> </div>
      
      <div className={css.divisor}><h3>½ <span className={css.celular}>reses</span></h3> <h5>{tropa.cabezas * 2}</h5></div>
      
      <div className={`${css.divisor} ${css.celular}`}><h3>Kg totales</h3> <h5>{tropa.kg_totales}</h5></div>
     {/* <div className={css.divisor}><h3>Consignatario</h3> <h5>{tropa.consignatario}</h5></div>*/ }
     
      <div className={css.divisor}><h3>Faena</h3> <h5>{tropa.faena}</h5></div>
    
      
    </div>
                            </Link>
  )) :
    <div className={css.loaderContainer}>
        <div className={css.loader}></div>
    </div>
}
</div>
                    {user.isAdmin ? 
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
            {Productores.map(productor => (
                <option key={productor._id} value={productor.nombre}>{productor.nombre}</option>
            ))}
        </select>
    </div>
<div className={css.input}>
        <label htmlFor="ingreso">Ingreso</label>
        <input type="date" name="fecha_ingreso" value={formData.fecha_ingreso || ''} id="ingreso" onChange={handleChange} />
    </div>
    <div className={css.input}>
        <label htmlFor="Cabezas">1/2</label>
        <input type="number" name="cabezas" id="Cabezas" value={formData.cabezas || ''} placeholder="*****" onChange={handleChange} />
    </div>

    <div className={css.input}>
        <label htmlFor="Kg">Kg totales</label>
        <input type="number" name="kg_totales" id="Kg"  value={formData.kg_totales || ''} placeholder="Kg totales" onChange={handleChange} />
    </div>
                                
    {/*
    <div className={css.input}>
            <label htmlFor="consignatario">Consignatario</label>
            <input type="text" name="consignatario" value={formData.consignatario || ''} placeholder="Consignatario" onChange={handleChange} />
        </div>

 <div className={css.input}>
        <label htmlFor="costo">Costo Kg</label>
        <input type="number" name="precio_compra" id="costo" value={formData.precio_compra || ''} placeholder="$" onChange={handleChange} />
    </div>

    <div className={css.input}>
        <label htmlFor="venta">Venta Kg</label>
        <input type="number" name="precio_venta" id="venta" placeholder="$"   value={formData.precio_venta || ''} onChange={handleChange} />
    </div>



     */}
    
    <div className={css.input}>
        <label htmlFor="faena">Tipo faena</label>
        <select name="faena" id="faena" value={formData.faena} onChange={handleChange}>
            <option value=""> Seleccionar... </option>
            <option value="Parcial"> Parcial </option>
            <option value="Total"> Total</option>
        </select>
    </div>

   

    <button type="submit" className={css.btn}> Añadir </button>
</form>



                </div>
                    </div>
                    : null}
                    





                </div>
            
            </div>
  
        )
    
}