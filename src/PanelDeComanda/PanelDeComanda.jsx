import React, { useState } from "react";
import PanelStyle from "./PanelDeComanda.module.css";
import { ShowDropButton } from "../Paht/Buttons/Buttons-Section/ShowDropButton";
import { FaAnchor, FaAnchorLock } from "react-icons/fa6";

export const PanelDeComanda = ({
  onCamareroChange,
  onDescriptionChange,
  Seccion,
  NumeroDeMesa,
  Descripcion,
}) => {
  const [camarero, setCamareroInput] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const CamareroChange = (e) => {
    const value = e.target.value;
    setCamareroInput(value);
    onCamareroChange(value);
  };

  const handleDescriptionChange = (e) => {
    onDescriptionChange(e.target.value);
  };

  const toggleNavVisibility = () => {
    setIsNavVisible((prevState) => !prevState);
  };

  return (
    <div
      className={`${PanelStyle.PanelContainer} ${
        isNavVisible ? PanelStyle.AnchorPanel : PanelStyle.NoAnchorPanel
      }`}
    >
      <ul className={PanelStyle.Panel}>
        <li className={PanelStyle.ButtonAnchorYTitlesContainer}>
          <li className={PanelStyle.titulo}>
            <h1>{Seccion}</h1>
            <h2>{NumeroDeMesa}</h2>
          </li>
          <li className={PanelStyle.ButtonAnchor}>
            <ShowDropButton
              onClick={toggleNavVisibility}
              className={`${PanelStyle.AnchorPanel} ${
                isNavVisible ? PanelStyle.NoAnchorPanel : ""
              }`}
              text={
                isNavVisible ? (
                  <FaAnchor className={PanelStyle.Icons} />
                ) : (
                  <FaAnchorLock className={PanelStyle.Icons} />
                )
              }
            />
          </li>
        </li>

        <li className={PanelStyle.InputContainer}>
          <input
            type="text"
            placeholder="Camarero"
            name="Camarero"
            list="camareroOptions"
            value={camarero}
            onChange={CamareroChange}
          />
          <datalist id="camareroOptions">
            <option value="Juan" />
            <option value="María" />
            <option value="Carlos" />
            <option value="Ana" />
            <option value="Luis" />
          </datalist>
        </li>
        <li>
          <input
            type="text"
            placeholder="Descripcion"
            name="Descripcion"
            value={Descripcion}
            onChange={handleDescriptionChange}
          />
        </li>
        <li>
          Comanda:
          <p>1Lorem ipsum dolor</p>
          <p>2sit amet consectetur</p>
          <p>3 sit amet consectetur</p>
          <p>4 explicabo nobis soluta q</p>
        </li>
        <li>
          <button>Abrir Mesa</button>
          <button>Cerrar Mesa</button>
        </li>
      </ul>
    </div>
  );
};
