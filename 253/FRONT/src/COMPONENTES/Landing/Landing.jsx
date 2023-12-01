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

    function navigateToHome() {
        navigate('/stock');
    }

    function handleLogin() {
        alert(`Usuario: ${username}, Contraseña: ${password}`);
        closeModal();
    }


    async function handleLogin() {
            // Tu lógica de autenticación aquí

            // Si la autenticación es exitosa, redirige a la página deseada
            closeModal();
            navigate('/stock'); // Reemplaza '/stock' con la ruta que desees
        }


  const handleSubmit = (e) => {
    e.preventDefault();

    const { userName, password } = e.target;

    const userData = {
      usuario: userName.value,
      contraseña: password.value
    };

    if ( userData.usuario === "" || userData.contraseña === "") {
      return alert("You must complete all fields");
    }

    signin(userData)
    .then(() => handleLogin())
    .catch((error) => {
        // Manejar el error, si es necesario
        console.error(error);
    });
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
