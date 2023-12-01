import axios from "axios";

const login = (userData) => async (dispatch) => {
  try {
    const response = await axios.post("/login", userData);
    localStorage.setItem("token", response.data.token);
    return response.data; // Puedes devolver cualquier dato necesario
  } catch (error) {
    // Error en la creación del usuario
    if (error.response && error.response.status === 404) {
      throw new Error("User not found");
    } else if (error.response && error.response.status === 401) {
      throw new Error("Invalid password");
    } else {
      // Otros errores
      // Aquí puedes manejar otros errores de la solicitud.
      throw new Error("Error: " + error.message);
    }
  }
};

export default login;
