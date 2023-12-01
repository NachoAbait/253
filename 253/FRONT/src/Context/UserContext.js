import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import login from "../REDUX/ACTIONS/logIn.js";
import verifyToken from "../REDUX/ACTIONS/verifyToken.js";
import createUser from "../REDUX/ACTIONS/signup.js";
import { useNavigate } from 'react-router-dom';

// Crea el contexto de usuario
export const UserContext = createContext();

export const useAuth = () => {
  
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Crea el componente proveedor que almacenará y proporcionará los datos del usuario
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // Función para establecer los datos del usuario una vez que se haya registrado
  const signup = (userData) => {
    dispatch(createUser(userData))
      .then(() => {
        setUser(userData);
      })
      .catch((error) => {
        // Error en la creación del usuario
        if (error.response && error.response.status === 409) {
          // Si el estado de respuesta es 409 (Conflict)
          alert("User already exists");
        } else {
          // Otros errores
          alert(error);
        }
      });
  };

  // Función para iniciar sesión
  const signin = async (userData) => {
    await dispatch(login(userData))
      .then((response) => {
        setUser(response);
        navigate('/stock');
      })
      .catch((error) => {
        // Error en la creación del usuario
        alert(error);
      });
  };

  // Función para eliminar los datos del usuario al cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Verificar si hay un token vigente para mantener los datos del usuario
  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");
      if (!token) {
        return setUser(null);
      }

      try {
        const res = await dispatch(verifyToken(token));
        if (!res) return setUser(null);
        setUser(res.payload);
      } catch (error) {
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  // Proporciona el estado 'user', las funciones  signup' y 'logout' a través del contexto
  return (
    <UserContext.Provider value={{ user, signup, signin, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Exporta el contexto de usuario
export default UserContext;
