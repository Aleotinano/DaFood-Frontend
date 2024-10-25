import React from "react";
import { Link } from "react-router-dom";
import NavStyle from "./navegador.module.css";
import { NavMobile } from "../NavMobil/NavMobil";
import UserIcon from "../Paht/Images/person_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import HelpIcon from "../Paht/Images//help_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import TableIcon from "../Paht/Images/table_bar_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import ProductosIcon from "../Paht/Images/grocery_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import GestionIcon from "../Paht/Images/monitoring_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import SettingsUserIcon from "../Paht/Images/settings_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

export const Navegador = () => {
  return (
    <nav className={NavStyle.NavbarContent}>
      <ul className={NavStyle.NavLinks}>
        <li>
          <Link to="/Section" className={NavStyle.Links}>
            <img src={TableIcon} alt="Mesas" className={NavStyle.Icons} />
          </Link>
        </li>
        <li>
          <Link to="/Opciones1" className={NavStyle.Links}>
            <img
              src={ProductosIcon}
              alt="Productos"
              className={NavStyle.Icons}
            />
          </Link>
        </li>
        <li>
          <Link to="/Opciones1" className={NavStyle.Links}>
            <img src={GestionIcon} alt="Gestión" className={NavStyle.Icons} />
          </Link>
        </li>
      </ul>

      <ul className={NavStyle.NavUserOptions}>
        <li>
          <Link to="/Usuario" className={NavStyle.Links}>
            <img src={UserIcon} alt="Usuario" className={NavStyle.Icons} />
          </Link>
        </li>
        <li>
          <Link to="/Preguntas" className={NavStyle.Links}>
            <img src={HelpIcon} alt="Preguntas" className={NavStyle.Icons} />
          </Link>
        </li>
        <li>
          <Link to="/Ajustes" className={NavStyle.Links}>
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
