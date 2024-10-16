import MesasStyle from "./Mesas.module.css";
import { useState } from "react"; // Asegúrate de importar useState

export const Mesas = ({
  mesas = [],
  setMesas,
  mesaGlobalCount,
  setMesaGlobalCount,
}) => {
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null); // Estado para la mesa seleccionada

  const agregarMesa = () => {
    const nuevaMesa = `Mesa ${mesaGlobalCount + 1}`;
    setMesas([...mesas, nuevaMesa]); // Agrega la nueva mesa a la sección actual
    setMesaGlobalCount(mesaGlobalCount + 1); // Incrementa el contador global de mesas
  };

  const eliminarMesa = () => {
    if (mesaSeleccionada !== null) {
      // Verifica si se eliminó una mesa que está por debajo del contador global
      if (mesaSeleccionada < mesaGlobalCount) {
        setMesaGlobalCount(mesaGlobalCount - 1); // Decrementa el contador global
      }

      setMesas(mesas.filter((mesa, index) => index !== mesaSeleccionada)); // Elimina la mesa seleccionada
      setMesaSeleccionada(null); // Resetea la mesa seleccionada
    }
  };

  const resetearContador = () => {
    setMesaGlobalCount(0); // Resetea el contador global
    setMesas([]); // También puedes querer vaciar la lista de mesas
  };

  return (
    <div className={MesasStyle.MesasContainerTotal}>
      <ul className={MesasStyle.MesasContainer}>
        <li>
          <button onClick={agregarMesa}>Agregar Mesa</button>
        </li>

        {mesas.map((mesa, index) => (
          <li key={index}>
            <button
              onClick={() => setMesaSeleccionada(index)} // Establece la mesa seleccionada
              className={mesaSeleccionada === index ? MesasStyle.selected : ""} // Agrega una clase para estilo
            >
              {mesa}
            </button>
          </li>
        ))}

        <div className={MesasStyle.MesasPanelControlDeMesas}>
          <button onClick={eliminarMesa} disabled={mesaSeleccionada === null}>
            Eliminar Mesa
          </button>{" "}
          {/* Botón para eliminar */}
          <button onClick={resetearContador}>Resetear Contador</button>{" "}
          {/* Botón para resetear */}
        </div>
      </ul>
    </div>
  );
};
