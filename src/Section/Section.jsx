import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SectionStyle from "./Sections.module.css";
import { Mesas } from "../Mesas/Mesas";
import DeleteIcon from "../Paht/Images/remove_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import AddIcon from "../Paht/Images/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import EditIcon from "../Paht/Images/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import EditMenu from "../Paht/Images/edit_note_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

export const Section = () => {
  const location = useLocation();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);

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

  const [activeSection, setActiveSection] = useState(null);

  const AddSectionButton = () => {
    let sectionName = prompt("Ingresa el nombre de la nueva sección:");

    while (true) {
      sectionName = sectionName.trim();

      if (/^[a-zA-Z0-9 ]+$/.test(sectionName)) {
        break;
      } else {
        alert("Por favor, ingresa solo letras, números o espacios.");
        sectionName = prompt("Ingresa el nombre de la nueva sección:");
      }
    }

    if (sectionName) {
      setSectionNames((prevSections) => {
        const updatedSections = [...prevSections, sectionName];
        setMesasPorSeccion((prevMesas) => ({
          ...prevMesas,
          [sectionName]: [],
        }));
        return updatedSections;
      });
    }
  };

  const RemoveSection = (indexToRemove) => {
    const sectionToRemove = sectionNames[indexToRemove];
    const mesasAEliminar = mesasPorSeccion[sectionToRemove].length;

    setSectionNames((prevSections) =>
      prevSections.filter((_, index) => index !== indexToRemove)
    );

    setMesasPorSeccion((prevMesas) => {
      const updatedMesas = { ...prevMesas };
      delete updatedMesas[sectionToRemove];
      return updatedMesas;
    });

    setMesaGlobalCount((prevCount) => prevCount - mesasAEliminar);
  };

  const EditSectionName = (sectionindex) => {
    const newName = prompt("Ingresa el nuevo nombre para la sección:");

    if (newName) {
      const oldName = sectionNames[sectionindex];
      setSectionNames((prevSections) =>
        prevSections.map((name, idx) => (idx === sectionindex ? newName : name))
      );

      setMesasPorSeccion((prevMesas) => {
        const updatedMesas = { ...prevMesas, [newName]: prevMesas[oldName] };
        delete updatedMesas[oldName];
        if (activeSection === oldName) {
          setActiveSection(newName);

          // Actualizar el hash en la URL para reflejar el nuevo nombre
          const newSectionId = newName.toLowerCase().replace(/\s+/g, "-");
          window.location.hash = `#${newSectionId}`;
        }
        return updatedMesas;
      });
    }
  };

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
      // Redirigir a la primera sección si no hay hash
      window.location.hash = `#${sectionNames[0]
        .toLowerCase()
        .replace(/\s+/g, "-")}`;
    }
  }, [location.hash, sectionNames, activeSection]);

  const handleSectionClick = (sectionName) => {
    const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-");
    setActiveSection(sectionName);
    window.location.hash = `#${sectionId}`;
  };

  return (
    <div className={SectionStyle.MesasSectionContainer}>
      <div className={SectionStyle.NavSections}>
        <ul className={SectionStyle.PanelControlDeSections}>
          <button
            onClick={AddSectionButton}
            className={SectionStyle.AddSectionButton}
          >
            <img
              src={AddIcon}
              alt="AddSection"
              className={SectionStyle.Icons}
            />
          </button>
          <button
            onClick={() => EditSectionName(selectedSectionIndex)}
            className={SectionStyle.EditSectionButton}
          >
            <img
              src={EditIcon}
              alt="EditSection"
              className={SectionStyle.Icons}
            />
          </button>
          <button
            onClick={() => RemoveSection(selectedSectionIndex)}
            className={SectionStyle.DeleteSectionButton}
          >
            <img
              src={DeleteIcon}
              alt="DeleteSection"
              className={SectionStyle.Icons}
            />
          </button>
        </ul>
        <ul className={SectionStyle.SectionContainer}>
          {sectionNames.map((sectionName, sectionindex) => {
            const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeSection === sectionName;
            const sectionClass = `${SectionStyle.Section} ${
              isActive ? SectionStyle.active : ""
            }`;

            return (
              <li
                key={sectionindex}
                className={sectionClass}
                onClick={() => setSelectedSectionIndex(sectionindex)}
              >
                <a
                  href={`#${sectionId}`}
                  onClick={(e) => {
                    e.preventDefault(); // Evitar el comportamiento predeterminado
                    handleSectionClick(sectionName);
                  }}
                >
                  {sectionName}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={SectionStyle.MesasContainer}>
        {activeSection && (
          <Mesas
            mesas={mesasPorSeccion[activeSection]}
            setMesas={(nuevasMesas) =>
              setMesasPorSeccion((prevMesas) => ({
                ...prevMesas,
                [activeSection]: nuevasMesas,
              }))
            }
            mesaGlobalCount={mesaGlobalCount}
            setMesaGlobalCount={setMesaGlobalCount}
          />
        )}
      </div>
    </div>
  );
};
