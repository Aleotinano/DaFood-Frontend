import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SectionStyle from "./Sections.module.css";
import { Mesas } from "../Mesas/Mesas";

export const Section = () => {
  const location = useLocation();

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

  const EditSectionName = (index) => {
    const newName = prompt("Ingresa el nuevo nombre para la sección:");

    if (newName) {
      const oldName = sectionNames[index];
      setSectionNames((prevSections) =>
        prevSections.map((name, idx) => (idx === index ? newName : name))
      );

      setMesasPorSeccion((prevMesas) => {
        const updatedMesas = { ...prevMesas, [newName]: prevMesas[oldName] };
        delete updatedMesas[oldName];
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
        <ul className={SectionStyle.AddSectionButtonContainer}>
          <button onClick={AddSectionButton}>Agregar Sección</button>
        </ul>
        <ul className={SectionStyle.SectionContainer}>
          {sectionNames.map((sectionName, index) => {
            const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeSection === sectionName;
            const sectionClass = `${SectionStyle.Section} ${
              isActive ? SectionStyle.active : ""
            }`;

            return (
              <li key={index} className={sectionClass}>
                <a
                  href={`#${sectionId}`}
                  onClick={(e) => {
                    e.preventDefault(); // Evitar el comportamiento predeterminado
                    handleSectionClick(sectionName);
                  }}
                >
                  {sectionName}
                </a>
                {isActive && (
                  <div className={SectionStyle.EditOptions}>
                    <button onClick={() => EditSectionName(index)}>Edit</button>
                    <button onClick={() => RemoveSection(index)}>X</button>
                  </div>
                )}
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
