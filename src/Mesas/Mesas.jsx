import MesasStyle from "./Mesas.module.css";
import { useState } from "react";
import { PanelDeComanda } from "../PanelDeComanda/PanelDeComanda";

export const Mesas = ({
  mesas = [],
  setMesas,
  mesaGlobalCount,
  setMesaGlobalCount,
}) => {
  const [camarerosPorMesa, setCamarerosPorMesa] = useState({});
  const [coloresMesa, setColoresMesa] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(
    mesas.length > 0 ? 0 : null
  );
  const MesaImg = "";

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
    setMesas([...mesas, nuevaMesa]);
    setMesaGlobalCount(mesaGlobalCount + 1);
  };

  const eliminarMesa = () => {
    if (mesaSeleccionada !== null) {
      const nuevasMesas = mesas.filter(
        (_, index) => index !== mesaSeleccionada
      );
      setMesas(nuevasMesas);
      setCamarerosPorMesa((prevCamareros) => {
        const newCamareros = { ...prevCamareros };
        delete newCamareros[mesaSeleccionada];
        return newCamareros;
      });
      // Si aún quedan mesas, selecciona otra
      if (nuevasMesas.length > 0) {
        setMesaSeleccionada(0); // O el índice que prefieras
      } else {
        setMesaSeleccionada(null); // Si no quedan mesas
      }
    }
  };

  const resetearContador = () => {
    setMesaGlobalCount(0);
    setMesas([]);
    setCamarerosPorMesa({});
    setColoresMesa([]); // Limpia los colores de las mesas
    localStorage.removeItem("coloresMesa"); // Limpia localStorage
  };

  return (
    <div className={MesasStyle.MesasContainerTotal}>
      <div className={MesasStyle.ContenedorMesas}>
        <ul className={MesasStyle.PanelControlDeMesas}>
          <li>
            <button onClick={agregarMesa} className={MesasStyle.AddTablebutton}>
              Agregar Mesa
            </button>
            <button
              onClick={eliminarMesa}
              disabled={mesaSeleccionada === null}
              className={MesasStyle.DeleteTablebutton}
            >
              Eliminar Mesa
            </button>
            <button
              onClick={resetearContador}
              className={MesasStyle.ResetTablebutton}
            >
              Resetear Contador
            </button>
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
                <div className={MesasStyle.SpanContentTable}>
                  <div className={MesasStyle.SpanTable}>
                    {MesaImg}
                    {mesa}
                  </div>
                  <div className={MesasStyle.SpanMozoInfo}>
                    {mesaSeleccionada === index && (
                      <p>Mozo: {camarerosPorMesa[index] || "Sin asignar"}</p>
                    )}
                  </div>
                </div>
              </button>
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
