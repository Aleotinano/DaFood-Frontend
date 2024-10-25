import { Link } from "react-router-dom";
import { useState } from "react";
import NavMobileStyle from "./NavMobil.module.css";
import MenuIcon from "../Paht/Images/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import MenuCloseIcon from "../Paht/Images/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import UserIcon from "../Paht/Images/person_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import HelpIcon from "../Paht/Images//help_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import SettingsUserIcon from "../Paht/Images/settings_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import "../Paht/variables/variables.css";

export const NavMobile = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className={NavMobileStyle.Navconteiner}>
      <ul className={NavMobileStyle.ButtonsConteiner}>
        <button onClick={toggleNavVisibility}>
          <img
            src={isNavVisible ? MenuCloseIcon : MenuIcon}
            alt="Menu"
            className={NavMobileStyle.Icons}
          />
        </button>
      </ul>
      <ul
        className={`${NavMobileStyle.DropMenu} ${
          isNavVisible ? NavMobileStyle.NavVisible : ""
        }`}
      >
        <li>
          <Link to="/Usuario" className={NavMobileStyle.Links}>
            <img
              src={UserIcon}
              alt="Usuario"
              className={NavMobileStyle.Icons}
            />
          </Link>
        </li>
        <li>
          <Link to="/Preguntas" className={NavMobileStyle.Links}>
            <img
              src={HelpIcon}
              alt="Preguntas"
              className={NavMobileStyle.Icons}
            />
          </Link>
        </li>
        <li>
          <Link to="/Ajustes" className={NavMobileStyle.Links}>
            <img
              src={SettingsUserIcon}
              alt="Ajustes"
              className={NavMobileStyle.Icons}
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};
