import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SectionStyle from "./Sections.module.css";
import { Mesas } from "../Mesas/Mesas";

export const Section = (mesas) => {
  const [sectionNames, setSectionNames] = useState(() => {
    const savedSections = localStorage.getItem("sections");
    return savedSections ? JSON.parse(savedSections) : [];
  });

  const [mesasPorSeccion, setMesasPorSeccion] = useState(() => {
    const savedMesas = localStorage.getItem("mesasPorSeccion");
    return savedMesas ? JSON.parse(savedMesas) : {}; // Objeto donde se almacenan las mesas por sección
  });

  // Estado para contar el número total de mesas
  const [mesaGlobalCount, setMesaGlobalCount] = useState(() => {
    const savedCount = localStorage.getItem("mesaGlobalCount");
    return savedCount ? JSON.parse(savedCount) : 0; // Inicializa en 0 si no hay en localStorage
  });

  const location = useLocation();
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
          [sectionName]: [], // Inicializa un array vacío para las mesas de la nueva sección
        }));
        return updatedSections;
      });
    }
  };

  const RemoveSection = (indexToRemove) => {
    const sectionToRemove = sectionNames[indexToRemove];

    // Obtiene el número de mesas en la sección a eliminar
    const mesasAEliminar = mesasPorSeccion[sectionToRemove].length;

    // Elimina la sección del estado de nombres y también de mesasPorSeccion
    setSectionNames((prevSections) =>
      prevSections.filter((_, index) => index !== indexToRemove)
    );

    setMesasPorSeccion((prevMesas) => {
      const updatedMesas = { ...prevMesas };
      delete updatedMesas[sectionToRemove]; // Elimina las mesas de esa sección
      return updatedMesas;
    });

    // Actualiza el contador global
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
        delete updatedMesas[oldName]; // Renombra las mesas asociadas a la sección
        return updatedMesas;
      });
    }
  };

  // Maneja el efecto de actualización del localStorage
  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sectionNames));
    localStorage.setItem("mesasPorSeccion", JSON.stringify(mesasPorSeccion));
    localStorage.setItem("mesaGlobalCount", JSON.stringify(mesaGlobalCount)); // Guardar el contador de mesas
  }, [sectionNames, mesasPorSeccion, mesaGlobalCount]);

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
        <ul className={SectionStyle.AddSectionButtonContainer}>
          <button onClick={AddSectionButton}>Agregar Sección</button>
        </ul>
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

            const sectionClass = `${SectionStyle.Section} ${
              isActive ? SectionStyle.active : ""
            }`;

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
      </div>

      {/* Mostrar el componente Mesas cuando hay una sección activa */}
      <>
        {activeSection && (
          <Mesas
            mesas={mesasPorSeccion[activeSection]} // Pasar las mesas de la sección activa
            setMesas={(nuevasMesas) =>
              setMesasPorSeccion((prevMesas) => ({
                ...prevMesas,
                [activeSection]: nuevasMesas, // Actualiza solo las mesas de la sección activa
              }))
            }
            mesaGlobalCount={mesaGlobalCount} // Pasar el contador global de mesas
            setMesaGlobalCount={setMesaGlobalCount} // Pasar la función para actualizar el contador global
          />
        )}
      </>
    </div>
  );
};
