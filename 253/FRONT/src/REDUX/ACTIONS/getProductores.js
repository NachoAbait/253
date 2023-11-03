import axios from "axios";

export const getProductores = (data) => async (dispatch) => {
  try {
    const response = await axios.get("/productor", data);
    dispatch({
      type: "GET_PRODUCTORES",
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
