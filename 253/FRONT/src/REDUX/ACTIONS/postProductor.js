import axios from "axios";

export const postDistribuidor = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/productor", data);
    console.log("se despacho la action");
    dispatch({
      type: "POST_PRODUCTOR",
      payload: response.data,
    });
  } catch (error) {
    throw new Error("No se pudo agregar el productor.");
  }
};
