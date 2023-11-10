import React, { useState } from "react";
import css from "./EliminarResSalida.module.css";
import { useDispatch } from "react-redux";
import { putResSalida } from "../../REDUX/ACTIONS/putResSalida";
import { getSalidas } from "../../REDUX/ACTIONS/getSalidas";

export default function EliminarResSalida({ res, onCancel, distribuidorId, fecha}) {
  // Este componente muestra un modal para eliminar una res

  const dispatch = useDispatch();

  const eliminarResYActualizarEstado = async () => {
    try {
      // Realiza el dispatch de la acción para actualizar la res y la salida
      await dispatch(putResSalida(res._id, fecha, distribuidorId)); // Asegúrate de tener acceso a fecha y distribuidorId

    // Realiza una solicitud GET para obtener las últimas salidas actualizadas
    await dispatch(getSalidas());

      // Lógica para cerrar el modal
      onCancel();
    } catch (error) {
      console.error("Error al eliminar la res y actualizar el estado:", error);
    }
  };


  return (
    <div className={css.container}>
      <div className={css.modal}>
              <h3>Eliminar Res de la salida</h3>
              <br />
        <p>¿Estás seguro de que deseas eliminar esta res ?</p>
       
              <p><span className={css.span}>Peso:</span> {res.peso}</p>
              <p><span className={css.span}>Productor:</span> {res.tropa.productor}</p>
        
        <div className={css.buttons}>
          <button className={css.deleteButton} onClick={eliminarResYActualizarEstado}>
            Eliminar
          </button>
          <button className={css.cancelButton} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
