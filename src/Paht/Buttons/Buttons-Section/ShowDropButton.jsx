import React from "react";

export const ShowDropButton = ({ onClick, className, text }) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};
