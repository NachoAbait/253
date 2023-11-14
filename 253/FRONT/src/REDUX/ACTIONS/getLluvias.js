// actions.js
import axios from "axios";
import moment from "moment"; 

export const getLluvias = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/lluvia");

      

      // Asegúrate de parsear las fechas adecuadamente
      const eventosLluvia = response.data.map((lluvia) => ({
        id: lluvia._id,
        title: `${lluvia.milimetros} mm`,
        start: moment(lluvia.date).toDate(), // Ajusta esto según el campo de fecha en tu base de datos
        end:  moment(lluvia.date).toDate(), // Puedes ajustar esto si es necesario
        rainfall: lluvia.milimetros,
      }));
    console.log("Datos de lluvias obtenidos:", eventosLluvia);
      dispatch({ type: "GET_LLUVIAS_SUCCESS", payload: eventosLluvia });
    } catch (error) {
      console.error("Error al obtener entradas de lluvia:", error);
      dispatch({ type: "GET_LLUVIAS_FAILURE", payload: error.message });
    }
  };
};
