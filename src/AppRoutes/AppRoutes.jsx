import { Routes, Route } from "react-router-dom";
import { Section } from "../Section/Section";
import { Opciones1 } from "../Opciones1/Opciones1";
import { PanelDeComanda } from "../PanelDeComanda/PanelDeComanda";
import StylesRoutes from "./AppRputes.module.css";

export const AppRoutes = () => (
  <Routes>
    <Route path="/Section" element={<Section />} />
    <Route path="/Opciones1" element={<Opciones1 />} />
  </Routes>
);
