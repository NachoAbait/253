import "./App.css";
import Home from "../COMPONENTES/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// COMPONENTES //
import Landing from "../COMPONENTES/Landing/Landing";
import Ingreso from "../COMPONENTES/Ingreso/Ingreso";
import Stock from "../COMPONENTES/Stock/Stock";
import Salida from "../COMPONENTES/Salida/Salida";
import Tropa from "../COMPONENTES/Tropa/Tropa";
import DetalleTropa from "../COMPONENTES/Tropa/DetalleTropa";
import Index from "../COMPONENTES/Los Cachorros/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/ingreso" element={<Ingreso />} />
          <Route exact path="/stock" element={<Stock />} />
          <Route exact path="/tropas" element={<Tropa />} />
          <Route exact path="/tropas/:id" element={<DetalleTropa />} />
          <Route exact path="/salidas" element={<Salida />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
