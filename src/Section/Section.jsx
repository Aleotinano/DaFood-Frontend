import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SectionStyle from "./Sections.module.css";
import { Mesas } from "../Mesas/Mesas";

export const Section = () => {
  const [sectionNames, setSectionNames] = useState(() => {
    const savedSections = localStorage.getItem("sections");
    return savedSections ? JSON.parse(savedSections) : [];
  });

  const location = useLocation();
  const [activeSection, setActiveSection] = useState(null); // Estado para la sección activa
  const [newSectionIndex, setNewSectionIndex] = useState(null); // Índice de la nueva sección

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
        setNewSectionIndex(updatedSections.length - 1); // Guarda el índice de la nueva sección
        return updatedSections;
      });
    }
  };

  const RemoveSection = (indexToRemove) => {
    setSectionNames((prevSections) =>
      prevSections.filter((_, index) => index !== indexToRemove)
    );
    setNewSectionIndex(null); // Restablece el índice si se elimina
  };

  const EditSectionName = (index) => {
    const newName = prompt("Ingresa el nuevo nombre para la sección:");

    if (newName) {
      setSectionNames((prevSections) =>
        prevSections.map((name, idx) => (idx === index ? newName : name))
      );
    }
  };

  // Maneja el efecto de actualización del localStorage
  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sectionNames));
  }, [sectionNames]);

  // Actualiza activeSection cada vez que cambia la URL
  useEffect(() => {
    const currentSection = sectionNames.find((sectionName, index) => {
      const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-");
      return location.hash === `#${sectionId}`;
    });
    if (currentSection) {
      setActiveSection(currentSection);
    } else if (sectionNames.length > 0 && !activeSection) {
      setActiveSection(sectionNames[0]);
    }
  }, [location.hash, sectionNames, activeSection]);

  return (
    <div className={SectionStyle.MesasSectionContainer}>
      <div className={SectionStyle.NavSections}>
        <ul className={SectionStyle.SectionContainer}>
          {sectionNames.map((sectionName, index) => {
            if (typeof sectionName !== "string") {
              console.error(
                `Error: El valor de sectionName no es una cadena: `,
                sectionName
              );
              return null;
            }

            const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-");
            const isActive = location.hash === `#${sectionId}`;

            // Añadir clases dinámicas
            const sectionClass = `${SectionStyle.Section} ${
              index === newSectionIndex ? SectionStyle.NewSection : ""
            } ${isActive ? SectionStyle.active : ""}`;

            return (
              <li key={index} className={sectionClass}>
                <a href={`#${sectionId}`}>{sectionName}</a>
                {isActive && (
                  <div className={SectionStyle.EditOptions}>
                    <button onClick={() => EditSectionName(index)}>
                      Editar Nombre
                    </button>
                    <button onClick={() => RemoveSection(index)}>
                      Eliminar
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <button onClick={AddSectionButton}>Agregar Sección</button>

        {/* Mostrar el componente Mesas cuando hay una sección activa */}
      </div>
      {activeSection && <Mesas sectionName={activeSection} />}
    </div>
  );
};
