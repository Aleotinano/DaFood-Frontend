import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SectionStyle from "./Sections.module.css";
import { Mesas } from "../Mesas/Mesas";
import DeleteIcon from "../Paht/Images/remove_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import AddIcon from "../Paht/Images/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import EditIcon from "../Paht/Images/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import EditIconClose from "../Paht/Images/playlist_remove_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import EditMenu from "../Paht/Images/edit_note_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import { AddSectionButton } from "../Paht/Buttons/Buttons-Section/AddSectionButton";
import { EditSectionButton } from "../Paht/Buttons/Buttons-Section/EditSectionButton";
import { DeleteSectionButton } from "../Paht/Buttons/Buttons-Section/DeleteSectionButton";
import { ShowDropButton } from "../Paht/Buttons/Buttons-Section/ShowDropButton";
import { AddButton } from "../Paht/Buttons/Buttons-Table/AddButton";
import { DeleteButton } from "../Paht/Buttons/Buttons-Table/DeleteButton";

export const Section = ({ mesas = [] }) => {
  const location = useLocation();
  const [mesaSeleccionada, setMesaSeleccionada] = useState(
    mesas.length > 0 ? 0 : null
  );
  const [camarerosPorMesa, setCamarerosPorMesa] = useState({});
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [sectionNames, setSectionNames] = useState(() => {
    const savedSections = localStorage.getItem("sections");
    return savedSections ? JSON.parse(savedSections) : [];
  });

  const [mesasPorSeccion, setMesasPorSeccion] = useState(() => {
    const savedMesas = localStorage.getItem("mesasPorSeccion");
    return savedMesas ? JSON.parse(savedMesas) : {};
  });

  const [mesaGlobalCount, setMesaGlobalCount] = useState(() => {
    const savedCount = localStorage.getItem("mesaGlobalCount");
    return savedCount ? JSON.parse(savedCount) : 0;
  });
  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sectionNames));
    localStorage.setItem("mesasPorSeccion", JSON.stringify(mesasPorSeccion));
    localStorage.setItem("mesaGlobalCount", JSON.stringify(mesaGlobalCount));
  }, [sectionNames, mesasPorSeccion, mesaGlobalCount]);

  useEffect(() => {
    const currentSection = sectionNames.find((sectionName) => {
      const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-");
      return location.hash === `#${sectionId}`;
    });

    if (currentSection) {
      setActiveSection(currentSection);
    } else if (sectionNames.length > 0 && !activeSection) {
      setActiveSection(sectionNames[0]);
      window.location.hash = `#${sectionNames[0]
        .toLowerCase()
        .replace(/\s+/g, "-")}`;
    }
  }, [location.hash, sectionNames, activeSection]);

  useEffect(() => {
    if (activeSection) {
      const newSectionId = activeSection.toLowerCase().replace(/\s+/g, "-");
      window.location.hash = `#${newSectionId}`;
    }
  }, [activeSection]);

  // Boton de reiniciar mesas ( por si esta antiguo el host local)

  const borrarMesas = () => {
    setMesaGlobalCount(0);
    setMesasPorSeccion((prevMesas) => ({
      ...prevMesas,
      [activeSection]: [],
    }));
  };

  useEffect(() => {
    localStorage.setItem("mesasPorSeccion", JSON.stringify(mesasPorSeccion));
  }, [mesasPorSeccion]);

  return (
    <div className={SectionStyle.MesasSectionContainer}>
      <div className={SectionStyle.NavSections}>
        <ul className={SectionStyle.PanelButtonsContainer}>
          <ShowDropButton
            isNavVisible={isNavVisible}
            setIsNavVisible={setIsNavVisible}
            className={SectionStyle.DropButton}
            text={
              <img
                src={isNavVisible ? EditIconClose : EditMenu}
                alt="Menu"
                className={SectionStyle.Icons}
              />
            }
          />
          <li
            className={`${SectionStyle.DropMenu} ${
              isNavVisible ? SectionStyle.NavVisible : ""
            }`}
          >
            <AddSectionButton
              className={SectionStyle.DropItem}
              setSectionNames={setSectionNames}
              setMesasPorSeccion={setMesasPorSeccion}
              sectionNames={sectionNames}
              setsectionNames={setSectionNames}
              text={
                <img
                  src={AddIcon}
                  alt="AddSection"
                  className={SectionStyle.Icons}
                />
              }
            />
            <EditSectionButton
              className={SectionStyle.DropItem}
              sectionNames={sectionNames}
              setSectionNames={setSectionNames}
              setMesasPorSeccion={setMesasPorSeccion}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              text={
                <img
                  src={EditIcon}
                  alt="EditSection"
                  className={SectionStyle.Icons}
                />
              }
            />
            <DeleteSectionButton
              className={SectionStyle.DropItem}
              sectionNames={sectionNames}
              setSectionNames={setSectionNames}
              mesasPorSeccion={mesasPorSeccion}
              setMesasPorSeccion={setMesasPorSeccion}
              setMesaGlobalCount={setMesaGlobalCount}
              setActiveSection={setActiveSection}
              activeSection={activeSection}
              text={
                <img
                  src={DeleteIcon}
                  alt="DeleteSection"
                  className={SectionStyle.Icons}
                />
              }
            />
            <AddButton
              className={SectionStyle.DropItem}
              mesaGlobalCount={mesaGlobalCount}
              mesas={mesasPorSeccion[activeSection] || []}
              setMesas={(nuevasMesas) =>
                setMesasPorSeccion((prevMesas) => ({
                  ...prevMesas,
                  [activeSection]: nuevasMesas,
                }))
              }
              activeSection={activeSection}
              setMesaGlobalCount={setMesaGlobalCount}
              text={
                <img
                  src={AddIcon}
                  alt="AddTable"
                  className={SectionStyle.Icons}
                />
              }
            />
            <DeleteButton
              mesas={mesasPorSeccion[activeSection]}
              setMesas={(nuevasMesas) =>
                setMesasPorSeccion((prevMesas) => ({
                  ...prevMesas,
                  [activeSection]: nuevasMesas,
                }))
              }
              setMesaGlobalCount={setMesaGlobalCount}
              mesaSeleccionada={mesaSeleccionada}
              setMesaSeleccionada={setMesaSeleccionada}
              setCamarerosPorMesa={setCamarerosPorMesa}
              text={
                <img
                  src={DeleteIcon}
                  alt="DeleteTable"
                  className={SectionStyle.Icons}
                />
              }
            />
            <button onClick={borrarMesas}>Borrar Todas las Mesas</button>
          </li>
        </ul>
        <ul className={SectionStyle.SectionContainer}>
          {sectionNames.map((sectionName, sectionIndex) => {
            const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeSection === sectionName;
            const sectionClass = `${SectionStyle.Section} ${
              isActive ? SectionStyle.active : ""
            }`;

            return (
              <li
                key={sectionIndex}
                className={sectionClass}
                onClick={() => setActiveSection(sectionName)}
              >
                <a href={`#${sectionId}`}>{sectionName}</a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={SectionStyle.MesasContainer}>
        {activeSection && (
          <Mesas
            mesaGlobalCount={mesaGlobalCount}
            setMesaGlobalCount={setMesaGlobalCount}
            activeSection={activeSection}
            mesaSeleccionada={mesaSeleccionada}
            setMesaSeleccionada={setMesaSeleccionada}
            setCamarerosPorMesa={setCamarerosPorMesa}
            camarerosPorMesa={camarerosPorMesa}
            mesas={mesasPorSeccion[activeSection]}
            setMesas={(nuevasMesas) =>
              setMesasPorSeccion((prevMesas) => ({
                ...prevMesas,
                [activeSection]: nuevasMesas,
              }))
            }
          />
        )}
      </div>
    </div>
  );
};
