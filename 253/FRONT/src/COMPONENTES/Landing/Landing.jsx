import React, { useState } from "react";
import css from "./Landing.module.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Context/UserContext";

export default function Landing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const { signin, user } = useAuth()


    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

   
   

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const { userName, password } = e.target;
      
        const userData = {
          usuario: userName.value,
          contraseña: password.value
        };
      
        if (userData.usuario === "" || userData.contraseña === "") {
          return alert("You must complete all fields");
        }
      
        try {
          await signin(userData);
          // El inicio de sesión fue exitoso, puedes redirigir o hacer otras acciones necesarias
          navigate("/stock");
        } catch (error) {
          // Error en el inicio de sesión
          if (error.response && error.response.data && error.response.data.error) {
            // Mensaje de error específico del backend
            alert(error.response.data.error);
          } else {
            // Mensaje de error genérico o específico
            console.error(error);
      
            if (error.message) {
              alert(`An error occurred: ${error.message}`);
            } else {
              alert("An error occurred during login. Please try again.");
            }
          }
        }
      };
      
    
    

    return (
        <div className={css.container}>
            <div className={css.num}>53</div>

            <button className={css.btn} onClick={openModal}>
                Ingresar
            </button>

            {isModalOpen && (
                <div className={css.modalOverlay}>
                    <div className={css.modalContent}>
                        <span className={css.closeButton} onClick={closeModal} >X</span>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="userName">Usuario:</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button type="submit" className={css.boton}>
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
