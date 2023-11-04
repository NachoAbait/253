import axios from "axios";

export const DELETE_RES_SUCCESS = "DELETE_RES_SUCCESS";
export const DELETE_RES_FAILURE = "DELETE_RES_FAILURE";

export function deleteRes(resId) {
  return async (dispatch) => {
    try {
      // Realiza una solicitud DELETE para eliminar la res con el ID especificado
      const response = await axios.delete(`/res/${resId}`);

      // Verifica si la solicitud fue exitosa (código de respuesta 204 generalmente indica éxito)
      if (response.status === 204) {
        dispatch({
          type: DELETE_RES_SUCCESS,
          payload: resId, // Envía el ID de la res eliminada como parte del payload
        });
      } else {
        dispatch({
          type: DELETE_RES_FAILURE,
          error: "No se pudo eliminar la res",
        });
      }
    } catch (error) {
      dispatch({
        type: DELETE_RES_FAILURE,
        error: error.message,
      });
    }
  };
}
