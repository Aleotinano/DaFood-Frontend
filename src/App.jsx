import "./index";
import { Routes, Route } from "react-router-dom";
import { Navegador } from "./Navegador/Navegador";
import { Section } from "./Section/Section";
import { Opciones1 } from "./Opciones1/Opciones1";
import { PanelDeComanda } from "./PanelDeComanda/PanelDeComanda";

function App() {
  return (
    <>
      <Navegador />
      <Routes>
        <Route
          path="/Section"
          element={
            <>
              <PanelDeComanda />
              <Section />
            </>
          }
        />
        <Route path="/Opciones1" element={<Opciones1 />} />
      </Routes>
    </>
  );
}

export default App;
