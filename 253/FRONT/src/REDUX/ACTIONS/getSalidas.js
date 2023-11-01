import axios from "axios";

export const getSalidas = (data) => async (dispatch) => {
  try {
    const response = await axios.get("/salidas", data);
    dispatch({
      type: "GET_SALIDAS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "TROPA_ADDED_FAILURE",
      error: error.response
        ? error.response.data
        : "Hubo un error al enviar el formulario",
    });
  }
};
