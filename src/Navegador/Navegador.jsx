import React from "react";
import { Link } from "react-router-dom";
import NavStyle from "./navegador.module.css";

export const Navegador = () => {
  return (
    <nav className={NavStyle.NavbarContent}>
      <ul className={NavStyle.NavUl1}>
        <li>
          <h3 className={NavStyle.Logo}>
            <b className={NavStyle.LogoRed}>Da</b>
            Food
          </h3>
        </li>
      </ul>

      <ul className={NavStyle.NavUl2}>
        <li>
          <Link to="/Section" className={NavStyle.Links}>
            Mesas
          </Link>
        </li>

        <li>
          <Link to="/Opciones1" className={NavStyle.Links}>
            Productos
          </Link>
        </li>

        <li>
          <Link to="/Opciones1" className={NavStyle.Links}>
            Gestion
          </Link>
        </li>

        <li>
          <Link to="/Opciones1" className={NavStyle.Links}>
            Opciones
          </Link>
        </li>
      </ul>

      <ul className={NavStyle.NavUl3}>
        <li>
          <Link to="Usuario" className={NavStyle.Links}>
            Usuario
          </Link>
        </li>

        <li>
          <Link to="Preguntas" className={NavStyle.Links}>
            Preguntas
          </Link>
        </li>

        <li>
          <Link to="Ajustes" className={NavStyle.Links}>
            Ajustes
          </Link>
        </li>
      </ul>
    </nav>
  );
};
