import { Link } from "react-router-dom";
import NavMobileStyle from "./NavMobil.module.css"; // Asegúrate que exista este archivo.
import MenuIcon from "../path-to-image/menu_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24.png";
import MenuCloseIcon from "../path-to-image/close_24dp_E8EAED_FILL0_wght300_GRAD0_opsz24.png";
import { useRef, useState } from "react";

export const NavMobile = () => {
  const [isNavVisible, setIsNavVisible] = useState(false); // Controla la visibilidad del contenedor

  // Función para mostrar el contenedor (cambiar a display: flex)
  const NavMobileShow = () => {
    setIsNavVisible(true);
  };

  // Función para ocultar el contenedor (cambiar a display: none)
  const NavMobileHide = () => {
    setIsNavVisible(false);
  };

  return (
    <div className={NavMobileStyle.Navconteiner}>
      <ul className={NavMobileStyle.OpenNavButton}>
        <button onClick={NavMobileShow}>
          <img src={MenuIcon} alt="Menu" />
        </button>

        {/* Botón para ocultar el menú */}
        <button onClick={NavMobileHide}>
          <img src={MenuCloseIcon} alt="Close" />
        </button>
      </ul>

      <ul
        className={NavMobileStyle.NavContent}
        id="NavContent"
        style={{ display: isNavVisible ? "flex" : "none" }}
      >
        <li>
          <Link to="/Section">Mesas</Link>
        </li>
        <li>
          <Link to="/Opciones1">Productos</Link>
        </li>
        <li>
          <Link to="/Opciones1">Gestion</Link>
        </li>
        <li>
          <Link to="/Opciones1">Opciones</Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link to="/Usuario">Usuario</Link>
        </li>
        <li>
          <Link to="/Preguntas">Preguntas</Link>
        </li>
        <li>
          <Link to="/Ajustes">Ajustes</Link>
        </li>
      </ul>
    </div>
  );
};
