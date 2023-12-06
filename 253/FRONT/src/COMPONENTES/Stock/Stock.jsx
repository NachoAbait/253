import Navbar from "../Navbar/Navbar";
import css from "./Stock.module.css";
import Card from "../Card/Card.jsx";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo } from "react";
import { getStock } from "../../REDUX/ACTIONS/getStock.js";
import SelectedCard from "../SelectedCard/SelectedCard";
import { getDistribuidores } from "../../REDUX/ACTIONS/getDistribuidores";
import SelectedReses from "../SelectedReses/SelectedReses.jsx";

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

  const [selectedCard, setSelectedCard] = useState(null);
    
  const deselectRes = () => {
    setSelectedCard(null);
  };

  const handleCardClick = (cardData) => {
    if (isSelectionMode) {
      // Si estamos en modo selección, agrega o quita la res del array de seleccionadas
      setSelectedReses((prevSelected) => {
        const isSelected = prevSelected.some((selectedRes) => selectedRes._id === cardData._id);
  
        if (isSelected) {
          // La res ya estaba seleccionada, quítala
          return prevSelected.filter((selectedRes) => selectedRes._id !== cardData._id);
        } else {
          // La res no estaba seleccionada, agrégala
          return [...prevSelected, cardData];
        }
      });
    } else {
      // Si no estamos en modo selección, simplemente muestra los detalles de la res
      setSelectedCard(cardData);
    }
  };
    

    const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedReses, setSelectedReses] = useState([]);
  
  const toggleSelectionMode = () => {
    setIsSelectionMode((prevMode) => !prevMode);
    // Desseleccionar todas las reses cuando cambiamos al modo de selección
    setSelectedCard(null);
    // Limpiar la lista de reses seleccionadas
    setSelectedReses([]);
  };

  console.log("Seleccion", selectedReses)

  
  function applyFilter(filterName) {
    switch (filterName) {
      case "todas":
        setFilteredStock(Stock);
        break;
      case "-90":
        setFilteredStock(Stock.filter((res) => res.peso <= 90));
        break;
      case "-100":
        setFilteredStock(Stock.filter((res) => res.peso > 90 && res.peso <= 100));
        break;
      case "-110":
        setFilteredStock(Stock.filter((res) => res.peso > 100 && res.peso <= 110));
        break;
      case "-120":
        setFilteredStock(Stock.filter((res) => res.peso > 110 && res.peso <= 120));
        break;
      case "+120":
        setFilteredStock(Stock.filter((res) => res.peso > 120));
        break;
      default:
        setFilteredStock(Stock);
    }
  }

  function handleFilter(filterName) {
    setSelectedFilter(filterName);
    applyFilter(filterName);
  }

  const totalMedias = useMemo(() => Stock.length, [Stock]);
  const totalKg = useMemo(() => Stock.reduce((total, res) => total + res.peso, 0), [Stock]);
  const menos90 = useMemo(() => Stock.filter((res) => res.peso <= 90).length, [Stock]);
  const entre90y100 = useMemo(() => Stock.filter((res) => res.peso > 90 && res.peso <= 100).length, [Stock]);
  const entre100y110 = useMemo(() => Stock.filter((res) => res.peso > 100 && res.peso <= 110).length, [Stock]);
  const entre110y120 = useMemo(() => Stock.filter((res) => res.peso > 110 && res.peso <= 120).length, [Stock]);
  const entre120y130 = useMemo(() => Stock.filter((res) => res.peso > 120 && res.peso <= 130).length, [Stock]);
  const mas120 = useMemo(() => Stock.filter((res) => res.peso > 120).length, [Stock]);

  return (
    <div>
      <Navbar></Navbar>

      <div className={css.container}>
        <div className={css.filtros}>
          <ul>
            <li className={selectedFilter === "todas" ? css.filtroSelected : ""} onClick={() => handleFilter("todas")}>
              Reses
            </li>
            <li className={selectedFilter === "-90" ? css.filtroSelected : ""} onClick={() => handleFilter("-90")}>
              -90
            </li>
            <li className={selectedFilter === "-100" ? css.filtroSelected : ""} onClick={() => handleFilter("-100")}>
              -100
            </li>
            <li className={selectedFilter === "-110" ? css.filtroSelected : ""} onClick={() => handleFilter("-110")}>
              -110
            </li>
            <li className={selectedFilter === "-120" ? css.filtroSelected : ""} onClick={() => handleFilter("-120")}>
              -120
            </li>
            <li className={selectedFilter === "+120" ? css.filtroSelected : ""} onClick={() => handleFilter("+120")}>
              +120
            </li>
            <button className={`${css.btnSeleccion} ${isSelectionMode ? css.buttonActive : css.buttonInactive}`} onClick={toggleSelectionMode}>
  {isSelectionMode ? "Desactivar Selección" : "Activar Selección"}
</button>
          </ul>
        </div>
        <div className={css.main}>
          {filteredStock.length > 0 ? (
            filteredStock.map((res) => (
              <Card
              key={res._id}
              tropa={res.tropa}
              categoria={res.categoria}
              peso={res.peso}
              observaciones={res.observaciones}
              onClick={() => handleCardClick(res)}
              isSelected={isSelectionMode ? selectedReses.some(selectedRes => selectedRes._id === res._id) : selectedCard === res}
            />
            
            ))
          ) : (
            <div className={css.loaderContainer}>
              <div className={css.loader}> </div>
            </div>
          )}
        </div>

        <div className={css.main3}>
          <div>
            <h3>
              <span className={css.responsive}>½</span> Totales
            </h3>
            <h4>{totalMedias}</h4>
          </div>
          <div>
            <h3>
              <span className={css.responsive}>½</span> Kg Total
            </h3>
            <h4>{totalKg}</h4>
          </div>
          <div>
            <h3>
              <span className={css.responsive}>½</span> -90
            </h3>
            <h4>{menos90}</h4>
          </div>
          <div>
            <h3>
              <span className={css.responsive}>½</span> -100
            </h3>
            <h4>{entre90y100}</h4>
          </div>
          <div>
            <h3>
              <span className={css.responsive}>½</span> -110
            </h3>
            <h4>{entre100y110}</h4>
          </div>
          <div>
            <h3>
              <span className={css.responsive}>½</span> -120
            </h3>
            <h4>{entre110y120}</h4>
          </div>
          <div>
            <h3>
              <span className={css.responsive}>½</span> +120
            </h3>
            <h4>{mas120}</h4>
          </div>
        </div>

        <div className={css.main2}>
  {isSelectionMode && selectedReses.length > 0 ? (
    <SelectedReses selectedReses={selectedReses} />
  ) : (
    selectedCard && <SelectedCard data={selectedCard} deselectRes={deselectRes} />
  )}
</div>
      </div>
    </div>
  );
}
