import React from "react";

export const AddSectionButton = ({
  sectionNames, // Asegúrate de que sectionNames sea pasado como prop
  setSectionNames,
  setMesasPorSeccion,
  text,
}) => {
  const handleAddSection = () => {
    let sectionName = prompt("Ingresa el nombre de la nueva sección:");

    while (true) {
      sectionName = sectionName.trim();

      if (/^[a-zA-Z0-9 ]+$/.test(sectionName) && sectionName.length > 0) {
        if (!sectionNames.includes(sectionName)) {
          // Cambiado a sectionNames
          break;
        } else {
          alert(
            "La sección ya existe. Por favor, ingresa un nombre diferente."
          );
        }
      } else {
        alert("Por favor, ingresa solo letras, números o espacios.");
      }
      sectionName = prompt("Ingresa el nombre de la nueva sección:");
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

  return <button onClick={handleAddSection}>{text}</button>;
};
