import React from "react";

export const AddButton = ({
  mesas,
  setMesas,
  mesaGlobalCount,
  setMesaGlobalCount,
  activeSection,
  text,
}) => {
  const AddTable = () => {
    if (!activeSection) return;
    const nuevaMesa = `Mesa ${mesaGlobalCount + 1}`;
    setMesas([...mesas, nuevaMesa]);
    setMesaGlobalCount(mesaGlobalCount + 1);
  };

  return (
    <button onClick={AddTable} disabled={!activeSection}>
      {text}
    </button>
  );
};
