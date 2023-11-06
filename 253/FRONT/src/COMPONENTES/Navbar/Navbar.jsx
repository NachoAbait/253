import React, { useEffect, useState , useMemo} from "react";
import css from "./Navbar.module.css"
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    let navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(null);

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
                    <li
                        onClick={() => navigateTo('/ingreso')}
                        className={selectedItem === '/ingreso' ? css.clicked : ''}
                    >
                        Ingreso
                    </li>
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
        </div>
    )
}

