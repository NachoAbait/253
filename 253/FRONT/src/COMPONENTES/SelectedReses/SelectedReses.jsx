import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import css from "./SelectedReses.module.css";
import { deleteRes } from "../../REDUX/ACTIONS/deleteRes";
import { useAuth } from "../../Context/UserContext";
import { getDistribuidores } from "../../REDUX/ACTIONS/getDistribuidores";
import { putRes } from "../../REDUX/ACTIONS/putRes";
import { getStock } from "../../REDUX/ACTIONS/getStock.js";


export default function SelectedReses({ selectedReses, deselectRes }) {
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

    if (!formData.fecha || !formData.distribuidor) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Obtener array de IDs de las reses seleccionadas
      const resIds = selectedReses.map((res) => res._id);

      // Llamar a putRes con el array de IDs
      await dispatch(putRes(resIds, formData.fecha, formData.distribuidor));
      dispatch(getStock());
      alert("Se despacharon las reses seleccionadas");
      deselectRes();
      setFormData({
        fecha: "",
        distribuidor: "",
      });
    } catch (error) {
      alert(
        "Ocurrió un error al despachar las reses. Por favor, verifica los datos y vuelve a intentarlo."
      );
      console.error("Error al despachar las reses:", error);
    }
  };
 


  return (
    <div className={css.cont}>

      <div className={css.contador}>
          {selectedReses.length} ½
      </div>

      <div className={css.container}>
        {selectedReses.map((data) => (
                <div key={data._id} className={css.card}>
                  <div className={css.data1}>
                    <div className={css.peso}>{data.peso}</div>
                  </div>
                </div>
              ))}
      </div>
      

      <div className={css.formulario}>
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
      </div>
    </div>
  );
}
