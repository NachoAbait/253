import React, { useEffect, useState , useMemo} from "react";
import css from "./Navbar.module.css"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTractor } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../Context/UserContext";

export default function Navbar() {

    let navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    const { signin, user } = useAuth()
    console.log(user)


    function navigateTo(destination) {
        setSelectedItem(destination);
        navigate(destination);
    }

   

    return (
        <div className={css.container}>
            <div className={css.logo}>
                53
            </div>

          
            <div className={css.lista}>
                <ul>
                    {user &&  user.isAdmin? <li
                        onClick={() => navigateTo('/ingreso')}
                        className={selectedItem === '/ingreso' ? css.clicked : ''}
                    >
                        Ingreso
                    </li>: null}
                    
                    <li
                        onClick={() => navigateTo('/stock')}
                        className={selectedItem === '/stock' ? css.clicked : ''}
                    >
                        Stock
                    </li>
                    <li
                        onClick={() => navigateTo('/tropas')}
                        className={selectedItem === '/tropas' ? css.clicked : ''}
                    >
                        Tropas
                    </li>
                    <li
                        onClick={() => navigateTo('/salidas')}
                        className={selectedItem === '/salidas' ? css.clicked : ''}
                    >
                        Salidas
                    </li>
                </ul>
            </div>

            {user ? <div className={css.user}>
                Hola, {user.usuario}
            </div>: null}
            
        </div>
    )
}

