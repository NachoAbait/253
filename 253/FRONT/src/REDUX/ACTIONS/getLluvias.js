// actions.js
import axios from "axios";

export const getLluvias = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/lluvia");
      dispatch({ type: "GET_LLUVIAS_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error al obtener entradas de lluvia:", error);
      dispatch({ type: "GET_LLUVIAS_FAILURE", payload: error.message });
    }
  };
};
