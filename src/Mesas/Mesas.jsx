import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MesasStyle from "./Mesas.module.css";

export const Mesas = () => {
  const [sectionNames, setSectionNames] = useState(() => {
    const savedSections = localStorage.getItem("sections");
    return savedSections ? JSON.parse(savedSections) : [];
  });

  const location = useLocation();

  const AddSectionButton = () => {
    const sectionName = prompt("Ingresa el nombre de la nueva sección:");

    while (true) {
  
      if (/^[a-zA-Z0-9]+$/.test(sectionName)) {
        break;
      } else {
        alert("Por favor, ingresa solo letras y números sin caracteres especiales.")
        AddSectionButton();
      }
    }

    if (sectionName) {
      setSectionNames((prevSections) => [...prevSections, sectionName]);
    }
    
  };


  const RemoveSection = (indexToRemove) => {
    setSectionNames((prevSections) =>
      prevSections.filter((_, index) => index !== indexToRemove)
    );
  };

  const EditSectionName = (index) => {
    const newName = prompt("Ingresa el nuevo nombre para la sección:");

    if (newName) {
      setSectionNames((prevSections) =>
        prevSections.map((name, idx) => (idx === index ? newName : name))
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sectionNames));
  }, [sectionNames]);

  return (
    <div className={MesasStyle.SectionMesas}>
      <div className={MesasStyle.NavBarMesas}>
        <ul className={MesasStyle.SectionContainer}>
          <li className={MesasStyle.Section}>
            <a href="#salon-principal">Salon Principal</a>
          </li>
          {sectionNames.map((sectionName, index) => {
            // Asegurarse de que sea una cadena antes de usar toLowerCase
            if (typeof sectionName !== "string") {
              console.error(`Error: El valor de sectionName no es una cadena: `, sectionName);
              return null;
            }

            const sectionId = sectionName.toLowerCase().replace(/\s+/g, "-");
            const isActive = location.hash === `#${sectionId}`;

            return (
              <li key={index} className={MesasStyle.Section}>
                <a href={`#${sectionId}`}>
                  {sectionName}
                </a>
                {isActive && (
                  <div className={MesasStyle.EditOptions}>
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
      </div>
    </div>
  );
};
