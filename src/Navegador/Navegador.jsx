import React from "react";
import NavStyle from "./navegador.module.css";

export const Navegador = () => {
  return (
    <nav className={NavStyle.NavbarContent}>
      <ul className={NavStyle.NavUl1}>
        <li><h1>DaFood</h1></li>
      </ul>
      <ul className={NavStyle.NavUl2}>
        <li>
          <a href="asdas">Mesesas</a>
        </li>
        <li>
          <a href="w">opciones</a>
        </li>
        <li>
          <a href="s">opciones</a>
        </li>

        <li>
          <a href="s">opciones</a>
        </li>

        <li>
          <a href="s">opciones</a>
        </li>

        <li>
          <a href="s">opciones</a>
        </li>
      </ul>
      <ul className={NavStyle.NavUl3}>
        
        <li><a href="s">Usuario</a></li>
        <li><a href="s">Preguntas</a></li>
        <li><a href="s">ajustes</a></li>
      </ul>
    </nav>
  );
};
