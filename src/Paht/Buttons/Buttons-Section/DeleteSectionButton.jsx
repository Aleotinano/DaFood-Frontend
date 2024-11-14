import React from "react";

export const DeleteSectionButton = ({
  sectionNames,
  setSectionNames,
  mesasPorSeccion,
  setMesasPorSeccion,
  setMesaGlobalCount,
  activeSection,
  setActiveSection,
  text,
}) => {
  const DeleteSection = () => {
    const sectionToRemove = activeSection;
    const mesasAEliminar = mesasPorSeccion[sectionToRemove]?.length || 0;

    // Elimina la sección de los nombres
    setSectionNames((prevSections) =>
      prevSections.filter((section) => section !== sectionToRemove)
    );

    // Elimina las mesas de la sección
    setMesasPorSeccion((prevMesas) => {
      const updatedMesas = { ...prevMesas };
      delete updatedMesas[sectionToRemove];
      return updatedMesas;
    });

    // Actualiza el conteo global de mesas
    setMesaGlobalCount((prevCount) => prevCount - mesasAEliminar);

    // Establece la sección activa a la primera sección si hay secciones restantes
    if (sectionNames.length > 1) {
      const newActiveSection =
        sectionNames[0] === sectionToRemove ? sectionNames[1] : sectionNames[0];
      setActiveSection(newActiveSection);
    } else {
      setActiveSection(null); // No hay secciones restantes
    }
  };

  return <button onClick={DeleteSection}>{text}</button>;
};
