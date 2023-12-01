import React, { useState } from "react";
import css from "./Landing.module.css";
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

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
                        <form>
                            <label htmlFor="username">Usuario:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
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

                            <button type="button" onClick={handleLogin} className={css.boton}>
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
