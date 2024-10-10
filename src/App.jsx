import { Routes, Route } from "react-router-dom";
import { Navegador } from "./Navegador/Navegador";
import { Section } from "./Section/Section";
import { Opciones1 } from "./Opciones1/Opciones1";

function App() {
  return (
    <>
      <Navegador />

      <Routes>
        <Route path="/Section" element={<Section />} />
        <Route path="/Opciones1" element={<Opciones1 />} />
      </Routes>
    </>
  );
}

export default App;
