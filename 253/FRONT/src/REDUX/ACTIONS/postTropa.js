import axios from "axios";

export const postTropa = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/tropa", data);
    console.log("se despacho la action");
    dispatch({
      type: "TROPA_ADDED_SUCCESS",
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
