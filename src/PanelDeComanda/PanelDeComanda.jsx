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
        <li>
          <h2>Mesañ</h2>
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
      </ul>
    </div>
  );
};
