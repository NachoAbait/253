import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import css from "./SelectedCard.module.css";
import { getDistribuidores } from "../../REDUX/ACTIONS/getDistribuidores";
import { putRes } from "../../REDUX/ACTIONS/putRes";
import { getStock } from "../../REDUX/ACTIONS/getStock.js";
import { deleteRes } from "../../REDUX/ACTIONS/deleteRes";
import { useAuth } from "../../Context/UserContext";

export default function SelectedCard({ data, deselectRes }) {
  const dispatch = useDispatch();
  const { user } = useAuth()

  useEffect(() => {
    dispatch(getDistribuidores());
  }, [dispatch]);

  const Distribuidores = useSelector((state) => state.Distribuidores);


  const [formData, setFormData] = useState({
    fecha: null, // Nuevo campo para la fecha de salida
    distribuidor: "", // Nuevo campo para el distribuidor
  });
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si se han completado los campos obligatorios
    if (!formData.fecha || !formData.distribuidor) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Envía la solicitud para marcar la salida con la fecha y el distribuidor
      await dispatch(putRes(data._id, formData.fecha, formData.distribuidor));
      dispatch(getStock());
      alert("Se despachó una nueva res");
      deselectRes();
      setFormData({
        fecha: "",
        distribuidor: "",
      });
    } catch (error) {
      alert(
        "Ocurrió un error al despachar la res. Por favor, verifica los datos y vuelve a intentarlo."
      );
      console.error("Error al despachar la res:", error);
    }
  };

  const eliminarRes = async () => {
    const confirmDelete = window.confirm("¿Estás seguro que deseas eliminar la res?");

    if (confirmDelete) {
      try {
        // Envía la solicitud para eliminar la res
        await dispatch(deleteRes(data._id));
        dispatch(getStock());
        alert("Se eliminó la res");
        deselectRes(); // Otra lógica para deseleccionar la res si es necesario
      } catch (error) {
        alert("Ocurrió un error al eliminar la res. Por favor, inténtalo de nuevo.");
        console.error("Error al eliminar la res:", error);
      }
    }
  };


  return (
    <div>
      <div className={css.card}>
        <div className={css.data1}>
          <div className={css.icono}>{data.categoria}</div>
          <div className={css.peso}>{data.peso}</div>
        </div>

        <div className={css.data2}>
          <div className={css.item}>
            <h4>Tropa</h4>
            <h5>{data.tropa.numero}</h5>
          </div>

          <div className={css.item}>
            <h4><span className={css.obser}>Fecha</span> Faena</h4>
            <h5>
              {new Date(data.tropa.fecha_ingreso).toLocaleDateString()}
            </h5>
          </div>

          <div className={css.item}>
            <h4>Productor</h4>
            <h5>{data.tropa.productor ? data.tropa.productor : "---"}</h5>
          </div>

          <div className={ `${css.item} ${css.obser}`}>
            <h4>Observaciones</h4>
            <h5>
              {data.observaciones ? data.observaciones : "---"}
            </h5>
          </div>
</div>
        { user && user.isAdmin ? 
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.salida}>
              <label htmlFor="fecha">Salida</label>
              <input
                type="date"
                name="fecha"
                id="fecha"
                className={css.select}
                value={formData.fecha} // Vincula el valor al estado
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="distribuidor">Distribuidor</label>
              <select
                name="distribuidor"
                id="distribuidor"
                className={css.select}
                value={formData.distribuidor} // Vincula el valor al estado
                onChange={(e) =>
                  setFormData({ ...formData, distribuidor: e.target.value })
                }
              >
                <option value="">Seleccionar...</option>
                {Distribuidores.map((distribuidor) => (
                  <option key={distribuidor._id} value={distribuidor._id}>
                    {distribuidor.nombre}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className={css.btn}>
              Marcar salida
            </button>
          </form>
        : null}
          

          
        { user && user.isAdmin ? <button className={css.eliminar} onClick={eliminarRes}>
            X
          </button>: null}
        
      </div>
    </div>
  );
}
