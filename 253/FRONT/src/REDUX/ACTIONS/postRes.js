import axios from "axios";

export const postRes = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/res", data);
    console.log("se despacho la action");
    dispatch({
      type: "POST_RES",
      payload: response.data,
    });
  } catch (error) {
    throw new Error("No se pudo agregar la res.");;
  }
};
