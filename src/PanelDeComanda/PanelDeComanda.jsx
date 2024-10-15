import React from "react";
import PanelStyle from "./PanelDeComida.module.css";

export const PanelDeComanda = () => {
  return (
    <div className={PanelStyle.PanelContainer}>
      <ul>
        <li>
          <h2>Mesa</h2>
        </li>
        <li>
          <p>Camarero</p>
        </li>
        <li>
          <p>Descripcion</p>
        </li>
      </ul>
    </div>
  );
};
