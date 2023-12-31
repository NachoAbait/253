import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar"
import css from "./Ingreso.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getTropas } from "../../REDUX/ACTIONS/getTropas";
import { postProductor } from "../../REDUX/ACTIONS/postProductor"
import {postRes} from "../../REDUX/ACTIONS/postRes"
import { useAuth } from "../../Context/UserContext";

export default function Ingreso() {

    const dispatch = useDispatch();
   


    useEffect(() => {
        dispatch(getTropas());
    }, [dispatch]);

    const Tropas = useSelector((state) => state.Tropas)
   


    const [formData, setFormData] = useState({
        tropa: '',
        categoria: '',
        kilos: [],  // Nuevo campo para manejar los kilos de todas las reses
        observaciones: ''
    });
    
    
    console.log(formData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'kilos') {
            // Dividir la entrada por comas y convertirla en un array de números
            const kilosArray = value.split(',').map(kilo => kilo.trim());
            setFormData(prevState => ({
                ...prevState,
                kilos: kilosArray
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value.trim()
            }));
        }
    };
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await dispatch(postRes(formData)); // Asumiendo que postRes es una operación asíncrona
            alert(`Se agregaron las reses a la tropa ${formData.tropa}`);
            setFormData({
                tropa: '',
                categoria: '',
                kilos: [],
                observaciones: ''
            });
        } catch (error) {
            alert('Ocurrió un error al agregar las reses. Por favor, verifica los datos y vuelve a intentarlo.');
            console.error("Error al agregar las reses:", error);
        }
    };
    
    

    //////////////// form productor////////////////////
    const [formDataProductor, setFormDataProductor] = useState({
        productor: ''
      });
    
      const handleChangeProductor = (e) => {
        const { name, value } = e.target;
        setFormDataProductor((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmitProductor = async (e) => {
        e.preventDefault();
    
        try {
          await dispatch(postProductor(formDataProductor)); // Asumiendo que postProductor es una operación asíncrona
          alert(`Se agregó un nuevo productor: ${formDataProductor.productor}`);
          setFormDataProductor({
            productor: ''
          });
        } catch (error) {
          alert('Ocurrió un error al agregar el productor. Por favor, verifica los datos y vuelve a intentarlo.');
          console.error("Error al agregar el productor:", error);
        }
      };

    return (
        <div>
            <Navbar></Navbar>
            <div className={css.container}>
             <div className={css.form}>
                    <h1>Ingreso de ½ </h1>

                    <form onSubmit={handleSubmit}>

                    <div className={css.input}>
                            <label for="tropa"> N° Tropa</label>
                            <select name="tropa" id="tropa" value={formData.tropa} onChange={handleChange}>
                                <option value=""> Seleccionar... </option>
                                {Tropas.slice(-3).map((tropa) => (
            <option key={tropa._id} value={tropa._id}>
                {tropa.numero}
            </option>
                                ))}

                                
                            </select>
                        </div>
                       

                        <div className={css.input}>
                            <label for="categoria">Categoria</label>
                            <select name="categoria" id="categoria" value={formData.categoria} onChange={handleChange}>
                                <option value="">Seleccionar...</option>
                                <option value="NO">Novillo</option>
                                <option value="NTO">Novillito</option>
                                <option value="VC">Vaca</option>
                                <option value="VQ">Vaquillona</option>
                            </select>
                        </div>

                        <div className={css.input}>
    <label htmlFor="kilos">Kilos </label>
    <input
        type="text"
        id="kilos"
        name="kilos"
        value={formData.kilos.join(',')}
        placeholder="Ejemplo: 100,150,80"
        onChange={handleChange}
    />
</div>

                    
                        

                        <div className={css.input}>
                            <label for="observaciones">Observaciones</label>
                            <input type="text" id="observaciones" name="observaciones" value={formData.observaciones} placeholder="****" onChange={handleChange}/>
                        </div>
                       
                        <button type="submit" className={css.btn}> Guardar </button>
                    </form>


                    
                </div>

                
               <div className={css.form}>
                <h1>Agregar Productor</h1>

                <form onSubmit={handleSubmitProductor}> {/* Utiliza handleSubmitProductor en lugar de handleSubmit */}
                    <div className={css.input}>
                    <label htmlFor="productor">Productor</label> {/* Usamos htmlFor en lugar de for para asociar la etiqueta con el input */}
                    <input
                        type="text"
                        id="productor"
                        name="productor"
                        value={formDataProductor.productor}
                        placeholder="nombre"
                        onChange={handleChangeProductor} // Usamos handleChangeProductor para este input
                    />
                    </div>

                    <button type="submit" className={css.btn}>
                    Guardar
                    </button>
                </form>
                </div>

               
                

               
               
                
            </div>
        </div>
        
    ) 
}