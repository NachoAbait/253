import axios from "axios";

export const DELETE_TROPA_SUCCESS = "DELETE_TROPA_SUCCESS";
export const DELETE_TROPA_FAILURE = "DELETE_TROPA_FAILURE";

export function deleteTropa(tropaId) {
  return async (dispatch) => {
    try {
      
      // Realiza una solicitud DELETE para eliminar la tropa con el ID especificado
      const response = await axios.delete(`/tropa/${tropaId}`);

      // Verifica si la solicitud fue exitosa (código de respuesta 204 generalmente indica éxito)
      if (response.status === 204) {
        dispatch({
          type: DELETE_TROPA_SUCCESS,
          payload: tropaId, // Envía el ID de la tropa eliminada como parte del payload
        });
      } else {
        dispatch({
          type: DELETE_TROPA_FAILURE,
          error: "No se pudo eliminar la tropa",
        });
      }
    } catch (error) {
      dispatch({
        type: DELETE_TROPA_FAILURE,
        error: error.message,
      });
    }
  };
}
