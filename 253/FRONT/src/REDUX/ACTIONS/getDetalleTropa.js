import axios from "axios";

export const getDetalleTropa = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/tropa/${id}`);
    console.log("se despacho la action");
    dispatch({
      type: "GET_DETALLE_TROPA",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "TROPA_DETALLE_FAILURE",
      error: error.response
        ? error.response.data
        : "Hubo un error al enviar el formulario",
    });
  }
};
