import React from "react";

export const EditSectionButton = ({
  setSectionNames,
  setMesasPorSeccion,
  activeSection,
  setActiveSection,
  text,
}) => {
  const EditSectionName = () => {
    const newName = prompt("Ingresa el nuevo nombre para la sección:");

    if (newName && activeSection) {
      setSectionNames((prevSections) =>
        prevSections.map((name) => (name === activeSection ? newName : name))
      );

      setMesasPorSeccion((prevMesas) => {
        const updatedMesas = {
          ...prevMesas,
          [newName]: prevMesas[activeSection],
        };
        delete updatedMesas[activeSection];
        setActiveSection(newName); // Actualiza a la nueva sección activa
        return updatedMesas;
      });
    }
  };

  return <button onClick={EditSectionName}>{text}</button>;
};
