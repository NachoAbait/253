import axios from "axios";

export const UPDATE_RES_SUCCESS = "UPDATE_RES_SUCCESS";
export const UPDATE_RES_FAILURE = "UPDATE_RES_FAILURE";

export function putRes(resId, fecha, distribuidorId) {
  return async (dispatch) => {
    try {
      // Crea un objeto con los datos de salida
      const salidaData = {
        fecha: fecha,
        distribuidorId: distribuidorId,
      };

      const response = await axios.put(`/res/${resId}`, salidaData);
      const updatedRes = response.data;

      dispatch({
        type: UPDATE_RES_SUCCESS,
        payload: updatedRes,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_RES_FAILURE,
        error: error.message,
      });
    }
  };
}
