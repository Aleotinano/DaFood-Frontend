import { useState, useEffect } from "react";

export const DeleteButton = ({
  mesas = [],
  setMesas,
  mesaSeleccionada,
  setMesaSeleccionada,
  setCamarerosPorMesa,
  setMesaGlobalCount,
  text,
}) => {
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

  const DeleteTable = () => {
    if (mesaSeleccionada !== null && mesas.length > 0) {
      // Eliminar la mesa seleccionada usando el índice directamente
      const nuevasMesas = mesas.filter(
        (_, index) => index !== mesaSeleccionada
      );

      // Actualizar el estado de camareros también
      setCamarerosPorMesa((prevCamareros) => {
        const newCamareros = { ...prevCamareros };
        const { [mesaSeleccionada]: _, ...camarerosRestantes } = newCamareros;
        return camarerosRestantes;
      });

      // Actualizar el estado de las mesas
      setMesas(nuevasMesas);
      setMesaGlobalCount((prevCount) => prevCount - 1);

      // Cambiar la selección después de eliminar
      const nuevaSeleccion =
        nuevasMesas.length > 0 ? nuevasMesas.length - 1 : null;
      setMesaSeleccionada(nuevaSeleccion);
    }
  };

  // Actualizamos la disponibilidad del botón de eliminar
  useEffect(() => {
    const disableButton = mesas.length === 0 || mesaSeleccionada === null;
    setIsDeleteDisabled(disableButton);
  }, [mesas, mesaSeleccionada]);

  return (
    <button onClick={DeleteTable} disabled={isDeleteDisabled}>
      {text}
    </button>
  );
};
