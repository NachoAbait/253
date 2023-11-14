// actions.js
import axios from "axios";

export const postLluvia = (fecha, milimetros) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/lluvia", {
        fecha,
        milimetros,
      });

      dispatch({ type: "POST_LLUVIA_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error al agregar entrada de lluvia:", error);
      dispatch({ type: "POST_LLUVIA_FAILURE", payload: error.message });
    }
  };
};
