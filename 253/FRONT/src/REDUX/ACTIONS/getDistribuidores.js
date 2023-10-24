import axios from "axios";

export const getDistribuidores = (data) => async (dispatch) => {
  try {
    const response = await axios.get("/distribuidor", data);
    console.log("se despacho la action");
    dispatch({
      type: "GET_DISTRIBUIDORES",
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
