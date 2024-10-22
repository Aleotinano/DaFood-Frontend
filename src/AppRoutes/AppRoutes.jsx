import { Routes, Route, Navigate } from "react-router-dom";
import { Section } from "../Section/Section";
import { Opciones1 } from "../Opciones1/Opciones1";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/Section" replace />} />

    <Route path="/Section" element={<Section />} />

    <Route path="/Opciones1" element={<Opciones1 />} />
  </Routes>
);
