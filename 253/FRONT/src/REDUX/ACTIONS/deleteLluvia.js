// actions.js
import axios from "axios";

export const deleteLluvia = (lluviaId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/api/lluvias/${lluviaId}`);
      dispatch({ type: "DELETE_LLUVIA_SUCCESS", payload: lluviaId });
    } catch (error) {
      console.error("Error al eliminar entrada de lluvia:", error);
      dispatch({ type: "DELETE_LLUVIA_FAILURE", payload: error.message });
    }
  };
};
