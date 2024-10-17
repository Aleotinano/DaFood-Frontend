import MesasStyle from "./Mesas.module.css";
import { useState } from "react";
import { PanelDeComanda } from "../PanelDeComanda/PanelDeComanda";

export const Mesas = ({
  mesas = [],
  setMesas,
  mesaGlobalCount,
  setMesaGlobalCount,
}) => {
  const [camarerosPorMesa, setCamarerosPorMesa] = useState({}); // Estado para almacenar el camarero de cada mesa
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null); // Estado para la mesa seleccionada

  const handleCamareroChange = (newCamarero) => {
    if (mesaSeleccionada !== null) {
      setCamarerosPorMesa((prevCamareros) => ({
        ...prevCamareros,
        [mesaSeleccionada]: newCamarero, // Almacena el camarero solo para la mesa seleccionada
      }));
    }
  };

  const agregarMesa = () => {
    const nuevaMesa = `Mesa ${mesaGlobalCount + 1}`;
    setMesas([...mesas, nuevaMesa]); // Agrega la nueva mesa a la sección actual
    setMesaGlobalCount(mesaGlobalCount + 1); // Incrementa el contador global de mesas
  };

  const eliminarMesa = () => {
    if (mesaSeleccionada !== null) {
      setMesas(mesas.filter((_, index) => index !== mesaSeleccionada)); // Elimina la mesa seleccionada

      setCamarerosPorMesa((prevCamareros) => {
        const newCamareros = { ...prevCamareros };
        delete newCamareros[mesaSeleccionada]; // Elimina el camarero asociado a la mesa
        return newCamareros;
      });

      setMesaSeleccionada(null); // Resetea la mesa seleccionada
    }
  };

  const resetearContador = () => {
    setMesaGlobalCount(0); // Resetea el contador global
    setMesas([]); // Vacía la lista de mesas
    setCamarerosPorMesa({}); // Limpia los camareros
  };

  return (
    <div className={MesasStyle.MesasContainerTotal}>
      <div className={MesasStyle.ContenedorMesas}>
        <ul className={MesasStyle.PanelControlDeMesas}>
          <li>
            <button onClick={agregarMesa}>Agregar Mesa</button>
            <button onClick={eliminarMesa} disabled={mesaSeleccionada === null}>
              Eliminar Mesa
            </button>
            <button onClick={resetearContador}>Resetear Contador</button>
          </li>
        </ul>

        <ul className={MesasStyle.Mesas}>
          {mesas.map((mesa, index) => (
            <li key={index}>
              <button
                onClick={() => setMesaSeleccionada(index)}
                className={
                  mesaSeleccionada === index ? MesasStyle.selected : ""
                }
              >
                {mesa}
              </button>
              {mesaSeleccionada === index && (
                <p>Mozo: {camarerosPorMesa[index] || "Sin asignar"}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <ul className={MesasStyle.PanelDeComandaContainer}>
        <PanelDeComanda onCamareroChange={handleCamareroChange} />
      </ul>
    </div>
  );
};
