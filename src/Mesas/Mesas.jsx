import React from "react";
import MesasStyle from "./Mesas.module.css";

export const Mesas = ({ sectionName }) => {
  return (
    <div className={MesasStyle.MesasContainer}>
      <h2>Mesas de {sectionName}</h2>
      {/* Aquí puedes agregar contenido único para cada sección */}
      <p>Contenido personalizado para {sectionName}</p>
      <ul>
        <li>
          <button>Agregar Mesa</button>
        </li>
        <li>
          <button>Mesa</button>
        </li>
      </ul>
    </div>
  );
};
