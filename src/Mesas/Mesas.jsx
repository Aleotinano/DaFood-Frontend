import React, { useState, useEffect } from "react";
import MesasStyle from "./Mesas.module.css";
import { PanelDeComanda } from "../PanelDeComanda/PanelDeComanda";
import { Table } from "../Paht/Buttons/Buttons-Table/Table";
import "../Paht/variables/Variables.css";

export const Mesas = ({
  mesas = [],
  setMesas,
  activeSection,
  mesaSeleccionada,
  setMesaSeleccionada,
  camarerosPorMesa,
  setCamarerosPorMesa,
}) => {
  const [descripcionesPorMesa, setDescripcionesPorMesa] = useState({});

  // Cargar descripciones desde localStorage al iniciar
  useEffect(() => {
    const savedDescriptions =
      JSON.parse(localStorage.getItem("descripcionesPorMesa")) || {};
    setDescripcionesPorMesa(savedDescriptions);
  }, []);

  // Guardar descripciones en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem(
      "descripcionesPorMesa",
      JSON.stringify(descripcionesPorMesa)
    );
  }, [descripcionesPorMesa]);

  const NumeroDeMesa =
    mesaSeleccionada !== null ? mesas[mesaSeleccionada] : null;

  const CamareroChange = (newCamarero) => {
    if (mesaSeleccionada !== null) {
      setCamarerosPorMesa((prevCamareros) => ({
        ...prevCamareros,
        [mesaSeleccionada]: newCamarero,
      }));
    }
  };

  const DescriptionChange = (newDescripcion) => {
    if (mesaSeleccionada !== null) {
      setDescripcionesPorMesa((prevDescripciones) => ({
        ...prevDescripciones,
        [mesaSeleccionada]: newDescripcion,
      }));
    }
  };

  return (
    <div className={MesasStyle.PanelyMesasContainer}>
      <div className={MesasStyle.ContenedorMesas}>
        {mesas.map((mesa, index) => (
          <Table
            setMesaSeleccionada={setMesaSeleccionada}
            SpanContentTable={MesasStyle.SpanContentTable}
            Spancontent={MesasStyle.Spancontent}
            Tables={`${MesasStyle.Tables} ${
              mesaSeleccionada === index ? MesasStyle.selected : ""
            }`}
            IconStyle={MesasStyle.IconSpam}
            IconSpam={MesasStyle.IconSpam}
            mesa={mesa}
            setMesas={setMesas}
            camarerosPorMesa={camarerosPorMesa}
            index={index}
            key={index}
          />
        ))}
      </div>

      <PanelDeComanda
        onCamareroChange={CamareroChange}
        onDescriptionChange={DescriptionChange}
        Seccion={activeSection}
        NumeroDeMesa={NumeroDeMesa}
        Descripcion={descripcionesPorMesa[mesaSeleccionada] || ""}
      />
    </div>
  );
};
