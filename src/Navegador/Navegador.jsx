import React from "react";
import { Link } from "react-router-dom";
import NavStyle from "./navegador.module.css";
import { NavMobile } from "../NavMobil/NavMobil";
import UserIcon from "../path-to-image/person_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png";
import CuestionsIcon from "../path-to-image/help_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png";
import SettingsUserIcon from "../path-to-image/settings_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png";
import TableIcon from "../path-to-image/table_bar_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png";
import ProductosIcon from "../path-to-image/grocery_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png";
import GestionIcon from "../path-to-image/analytics_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png";

export const Navegador = () => {
  return (
    <nav className={NavStyle.NavbarContent}>
      <ul className={NavStyle.LogoContainer}>
        <h3>Dafood</h3>
      </ul>

      <ul className={NavStyle.NavLinks}>
        <li>
          <Link to="/Section" className={NavStyle.Links}>
            Mesas
            <img src={TableIcon} alt="Mesas" className={NavStyle.Icons} />
          </Link>
        </li>
        <li>
          <Link to="/Opciones1" className={NavStyle.Links}>
            Productos
            <img
              src={ProductosIcon}
              alt="Productos"
              className={NavStyle.Icons}
            />
          </Link>
        </li>
        <li>
          <Link to="/Opciones1" className={NavStyle.Links}>
            Estadisticas
            <img src={GestionIcon} alt="Gestión" className={NavStyle.Icons} />
          </Link>
        </li>
      </ul>

      <ul className={NavStyle.NavUserOptions}>
        <li>
          <Link to="/Usuario" className={NavStyle.Links}>
            Usuario
            <img src={UserIcon} alt="Usuario" className={NavStyle.Icons} />
          </Link>
        </li>
        <li>
          <Link to="/Preguntas" className={NavStyle.Links}>
            Preguntas
            <img
              src={CuestionsIcon}
              alt="Preguntas"
              className={NavStyle.Icons}
            />
          </Link>
        </li>
        <li>
          <Link to="/Ajustes" className={NavStyle.Links}>
            Ajustes
            <img
              src={SettingsUserIcon}
              alt="Ajustes"
              className={NavStyle.Icons}
            />
          </Link>
        </li>
      </ul>

      <NavMobile />
    </nav>
  );
};
