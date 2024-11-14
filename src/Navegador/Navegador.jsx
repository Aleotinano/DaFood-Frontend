import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavStyle from "./navegador.module.css";
import {
  MdOutlineTableBar,
  MdOutlineFastfood,
  MdOutlineHelpOutline,
} from "react-icons/md";
import { IoMdSettings, IoMdClose } from "react-icons/io";
import { FaRegChartBar } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import Logo from "../Paht/Images/DaFood Logo.png";

export const Navegador = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [maxVisibleItems, setMaxVisibleItems] = useState(3); // Limite inicial de items visibles en el menú principal

  const toggleNavVisibility = () => {
    setIsNavVisible(!isNavVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 280) {
        setMaxVisibleItems(1);
      } else if (width < 360) {
        setMaxVisibleItems(2);
      } else {
        setMaxVisibleItems(3);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Ejecuta la función al montar el componente para establecer el estado inicial
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { to: "/Section", icon: <MdOutlineTableBar className={NavStyle.Icons} /> },
    {
      to: "/Productos",
      icon: <MdOutlineFastfood className={NavStyle.Icons} />,
    },
    { to: "/Gestion", icon: <FaRegChartBar className={NavStyle.Icons} /> },
  ];

  return (
    <nav className={NavStyle.NavbarContent}>
      <ul className={NavStyle.NavLinks}>
        <li className={NavStyle.LogoContainer}>
          <img className={NavStyle.Logo} src={Logo} alt="Logo" />
        </li>
        {/* Muestra elementos en el menú principal hasta el máximo permitido */}
        {navItems.slice(0, maxVisibleItems).map((item, index) => (
          <li key={index}>
            <Link to={item.to} className={NavStyle.Links}>
              {item.icon}
            </Link>
          </li>
        ))}

        {/* Botón del menú móvil */}
        <li className={NavStyle.NavMobileButton} onClick={toggleNavVisibility}>
          <span className={NavStyle.Links}>
            {isNavVisible ? (
              <IoMdClose className={NavStyle.Icons} />
            ) : (
              <RiMenu3Fill className={NavStyle.Icons} />
            )}
          </span>
        </li>

        {/* Elementos ocultos en el menú principal aparecen en el menú móvil */}
        <li>
          <ul
            className={`${NavStyle.NavUserOptions} ${
              isNavVisible ? NavStyle.NavVisible : ""
            }`}
          >
            {navItems.slice(maxVisibleItems).map((item, index) => (
              <li key={index}>
                <Link to={item.to} className={NavStyle.Links}>
                  {item.icon}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/Usuario" className={NavStyle.Links}>
                <IoPerson className={NavStyle.Icons} />
              </Link>
            </li>
            <li>
              <Link to="/Preguntas" className={NavStyle.Links}>
                <MdOutlineHelpOutline className={NavStyle.Icons} />
              </Link>
            </li>
            <li>
              <Link to="/Ajustes" className={NavStyle.Links}>
                <IoMdSettings className={NavStyle.Icons} />
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
