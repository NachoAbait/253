import axios from "axios";

const createUser = (userData) => {
  return () => {
    return axios
      .post("/signup", userData)
      .then((response) => {
        // Usuario creado exitosamente
        // Aquí puedes mostrar una alerta o realizar otras acciones
        return response.data; // Puedes devolver cualquier dato necesario
      })
      .catch((error) => {
        // Error en la creación del usuario
        if (error.response && error.response.status === 409) {
          // Si el estado de respuesta es 409 (Conflict)
          // Aquí puedes mostrar una alerta o realizar otras acciones
          throw new Error("User already exists");
        } else {
          // Otros errores
          // Aquí puedes manejar otros errores de la solicitud
          throw new Error("Error: " + error.message);
        }
      });
  };
};

export default createUser;
