import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"
import css from "./Salida.module.css"
import {getSalidas} from "../../REDUX/ACTIONS/getSalidas"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import EliminarResSalida from "../Modal/EliminarResSalida";
import { putResSalida } from "../../REDUX/ACTIONS/putResSalida";
import { useAuth } from "../../Context/UserContext";



export default function Salida() {
    const dispatch = useDispatch();
    const { signin, user } = useAuth()
    
    useEffect(() => {
        dispatch(getSalidas());
    }, [dispatch]);

    const Salidas = useSelector((state) => state.Salidas)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [resToDelete, setResToDelete] = useState(null);
    const [selectedSalida, setselectedSalida] = useState(null);
    const sortedSalidas = Salidas.slice().sort((a, b) => new Date(b.fecha) - new Date(a.fecha));


    const openDeleteModal = (res) => {
      setShowDeleteModal(true);
      setResToDelete(res);
    };
  
    const closeDeleteModal = () => {
      setShowDeleteModal(false);
        setResToDelete(null);
       
    };
    

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
                        {sortedSalidas.length ? sortedSalidas.map(salida => (
                            <div key={salida._id} className={`${css.salidaDiv} ${selectedSalida === salida ? css.selected : ''}`} onClick={()=> handleSalidaClick(salida)}>
                                <div className={`${css.divisor}`}><h3>Fecha </h3> <h5>{new Date(salida.fecha).toLocaleDateString()}</h5></div>
                                <div className={`${css.divisor} `}><h3> ½<span> reses</span> </h3> <h5>{salida.animales.length}</h5></div>
                                <div className={`${css.divisor} ${css.celular}`}><h3>Kg totales</h3> <h5>{calcularKgTotales(salida.animales)}</h5></div>
                                <div className={`${css.divisor}`}><h3>Distribuidor</h3> <h5>{salida.distribuidor.nombre}</h5></div>
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
                                <div className={css.animalesSalida} onClick={() => openDeleteModal(res)}>
                                    <div className={css.peso}>
                                        {res.peso}
                                    </div>
                                    <div className={css.tropa}>
                                        {res.tropa.productor}
                                    </div>
                                </div>
                            )
                        }): null }
                    </div>

                    {showDeleteModal && user.isAdmin &&  (
                        <EliminarResSalida
                            res={resToDelete}
                            distribuidorId={selectedSalida.distribuidor._id}
                            fecha={selectedSalida.fecha}
                        onCancel={closeDeleteModal}
                        />
                    )}

                </div>
            
            </div>
  
        )
    
}