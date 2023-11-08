import axios from "axios";

export function putResSalida(resId, fecha, distribuidorId) {
  return async (dispatch) => {
    try {
      // Crea un objeto con los datos de salida
      const salidaData = {
        fecha: fecha,
        distribuidorId: distribuidorId,
      };
      console.log("en la action putResSalida", salidaData);
      const response = await axios.put(`/salidas/${resId}`, salidaData); // Cambia la ruta a `/salidas/:id`
      const updatedRes = response.data;
      console.log("resultado", updatedRes);
      dispatch({
        type: "PUT_RES_SALIDA",
        payload: updatedRes,
      });
    } catch (error) {
      dispatch({
        type: "PUT_RES_SALIDA_ERROR",
        error: error.message,
      });
    }
  };
}
