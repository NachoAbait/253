
import Navbar from "../Navbar/Navbar"
import css from "./Stock.module.css"
import Card from "../Card/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState , useMemo} from "react";
import { getStock } from "../../REDUX/ACTIONS/getStock.js"
import SelectedCard from "../SelectedCard/SelectedCard";
import { getDistribuidores } from "../../REDUX/ACTIONS/getDistribuidores"

export default function Stock() {
    const dispatch = useDispatch();
    
 
    const rawStock = useSelector((state) => state.Stock);

    const Stock = useMemo(() => {
        return rawStock.slice().sort((b, a) => new Date(b.tropa.fecha_ingreso) - new Date(a.tropa.fecha_ingreso));
    }, [rawStock]);
    
    
    const [selectedFilter, setSelectedFilter] = useState("todas");
    const [filteredStock, setFilteredStock] = useState(Stock);

    useEffect(() => {
        dispatch(getStock());
    }, [dispatch]);
    
    useEffect(() => {
        applyFilter(selectedFilter);
    }, [Stock, selectedFilter]);
    
    const [selectedCard, setSelectedCard] = useState(null);  // 1. Estado Local para el Detalle

    const deselectRes = () => {
        setSelectedCard(null);  // suponiendo que el nombre de tu estado es `selectedRes` y su valor inicial es `null`.
    };

    const handleCardClick = (cardData) => {  // 2. Función para Seleccionar una Tarjeta
        setSelectedCard(cardData);
    }



    ///////// FILTROS ///////////////////////////////


    function applyFilter(filterName) {
        switch(filterName) {
            case "todas":
                setFilteredStock(Stock);
                break;
            case "-90":
                setFilteredStock(Stock.filter(res => res.peso <= 90));
                break;
            case "-100":
                setFilteredStock(Stock.filter(res => res.peso > 90 && res.peso <= 100));
                break;
            case "-110":
                setFilteredStock(Stock.filter(res => res.peso > 100 && res.peso <= 110));
                break;
            case "-120":
                setFilteredStock(Stock.filter(res => res.peso > 110 && res.peso <= 120));
                break;
                case "+120":
                    setFilteredStock(Stock.filter(res => res.peso > 120 ));
                    break;
            default:
                setFilteredStock(Stock);
        }
    }
    

    function handleFilter(filterName){
        setSelectedFilter(filterName);
        applyFilter(filterName);
    }
    


    /////////////////////////////// MAIN3 //////////////////////////////////////
    const totalMedias = useMemo(() => Stock.length, [Stock]);

    const totalKg = useMemo(() => Stock.reduce((total, res) => total + res.peso, 0), [Stock]);
    
    const menos90 = useMemo(() => Stock.filter(res => res.peso <= 90).length, [Stock]);
    
    const entre90y100 = useMemo(() => Stock.filter(res => res.peso > 90 && res.peso <= 100).length, [Stock]);
    
    const entre100y110 = useMemo(() => Stock.filter(res => res.peso > 100 && res.peso <= 110).length, [Stock]);
    
    const entre110y120 = useMemo(() => Stock.filter(res => res.peso > 110 && res.peso <= 120).length, [Stock]);
    
    const entre120y130 = useMemo(() => Stock.filter(res => res.peso > 120 && res.peso <= 130).length, [Stock]);

    const mas120 = useMemo(() => Stock.filter(res => res.peso > 120).length, [Stock]);
    

        return (
            <div>
                <Navbar></Navbar>
            
                <div className={css.container}>
                    <div className={css.filtros}>
                    <ul>
                        <li className={selectedFilter === "Reses" ? css.filtroSelected : ""}  onClick={() => handleFilter("todas")}>Todas</li>
                        <li className={selectedFilter === "-90" ? css.filtroSelected : ""} onClick={() => handleFilter("-90")}>-90</li>
                        <li className={selectedFilter === "-100" ? css.filtroSelected : ""} onClick={() => handleFilter("-100")}>-100</li>
                        <li className={selectedFilter === "-110" ? css.filtroSelected : ""} onClick={() => handleFilter("-110")}>-110</li>
                            <li className={selectedFilter === "-120" ? css.filtroSelected : ""} onClick={() => handleFilter("-120")}>-120</li>
                            <li className={selectedFilter === "+120" ? css.filtroSelected : ""} onClick={() => handleFilter("+120")}>+120</li>
                    </ul>
                    </div>
                    <div className={css.main}>
                       
                        {filteredStock.length > 0 ? filteredStock.map((res) => (
                            <Card
                                key={res._id}
                                tropa={res.tropa}
                                categoria={res.categoria}
                                peso={res.peso}
                                observaciones={res.observaciones}
                                onClick={() => handleCardClick(res)}  // 3. Manejador de Eventos en las Cards

                            />
                        )) :   <div className={css.loaderContainer}>
                        <div className={css.loader}> </div>
                    </div>
                        
                       
                        
                        }
                           
                   

                    </div>

                    <div className={css.main3}>
                        <div>
                            <h3><span className={css.responsive}>½</span> Totales</h3>
                            <h4>{ totalMedias }</h4>
                        </div>
                        <div>
                            <h3><span className={css.responsive}>½</span> Kg Total</h3>
                            <h4>{ totalKg}</h4>
                        </div>
                        <div>
                            <h3> <span className={css.responsive}>½</span> -90</h3>
                            <h4>{menos90}</h4>
                        </div>
                        <div>
                        <h3><span className={css.responsive}>½</span> -100</h3>
                            <h4>{entre90y100}</h4>
                        </div>
                        <div>
                        <h3><span className={css.responsive}>½</span> -110</h3>
                            <h4>{entre100y110}</h4>
                        </div>
                        <div>
                        <h3><span className={css.responsive}>½</span> -120</h3>
                            <h4>{entre110y120 }</h4>
                        </div>
                        <div>
                        <h3><span className={css.responsive}>½</span> +120</h3>
                            <h4>{mas120}</h4>
                        </div>
                    </div>

                    <div className={css.main2}>
                    {selectedCard && (
                        <SelectedCard data={selectedCard} deselectRes={deselectRes} /> // 4. Renderizar Detalles en `main2`
                    )}
                            
                    </div>
                </div>
            
            </div>
  
        )
    
}