import React, { useState } from "react";
import PanelStyle from "./PanelDeComanda.module.css";

export const PanelDeComanda = ({ onCamareroChange }) => {
  const [camarero, setCamareroInput] = useState("");

  const handleCamareroChange = (e) => {
    const value = e.target.value;
    setCamareroInput(value);
    onCamareroChange(value); // Notificar al padre sobre el cambio
  };

  return (
    <div className={PanelStyle.PanelContainer}>
      <ul>
        <li className={PanelStyle.titulo}>
          <h2>Seccion</h2>
          <h2>Mesa</h2>
        </li>
        <li>
          <input
            type="text"
            placeholder="Camarero"
            name="Camarero"
            value={camarero}
            onChange={handleCamareroChange} // Captura el cambio en el input
          />
          <label htmlFor="Camarero"></label>
        </li>
        <li>
          <p>Descripción</p>
        </li>

        <li>
          Comanda: <p>1Lorem ipsum dolor</p>
          <p>2sit amet consectetur </p> <p>3 sit amet consectetur </p>{" "}
          <p>4 explicabo nobis soluta q</p>
        </li>
        <li>
          <button>Abrir Mesa</button>
        </li>
        <li>
          <button>Cerrar Mesa</button>
        </li>
      </ul>
    </div>
  );
};
