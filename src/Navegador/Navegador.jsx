import React from "react";
import { Link } from "react-router-dom";
import NavStyle from "./navegador.module.css";

export const Navegador = () => {
  return (
    <nav className={NavStyle.NavbarContent}>
      <ul className={NavStyle.NavUl1}>
        <li>
          <h1>DaFood</h1>
        </li>
      </ul>

      <ul className={NavStyle.NavUl2}>
        <li>
          <Link to="/Section">Sections</Link>
        </li>

        <li>
          <Link to="/Opciones1">opciones</Link>
        </li>
      </ul>

      <ul className={NavStyle.NavUl3}>
        <li>
          <Link to="Usuario">Usuario</Link>
        </li>

        <li>
          <Link to="Preguntas">Preguntas</Link>
        </li>

        <li>
          <Link to="Ajustes">Ajustes</Link>
        </li>
      </ul>
    </nav>
  );
};
