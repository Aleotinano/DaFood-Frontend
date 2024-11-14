import React from "react";
import { BsPerson } from "react-icons/bs";
import { MdOutlineTableBar } from "react-icons/md";

export const Table = ({
  setMesaSeleccionada,
  Tables,
  SpanContentTable,
  Spancontent,
  IconStyle,
  IconSpam,
  mesa,
  camarerosPorMesa = [],
  index,
}) => {
  const SelectedTable = () => {
    setMesaSeleccionada(index);
    console.log(mesa);
  };

  return (
    <button onClick={SelectedTable} className={Tables} key={index}>
      <div className={SpanContentTable}>
        <div className={Spancontent}>
          <MdOutlineTableBar className={IconStyle} />
          {mesa}
        </div>
        <div className={Spancontent}>
          <BsPerson className={IconSpam} />
          <p>{camarerosPorMesa[index] || "Sin asignar"}</p>
        </div>
      </div>
    </button>
  );
};
