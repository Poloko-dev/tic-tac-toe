import React from "react";

export default function Square({ value, onClick, disableClick }) {
  return (
    <button
      className="square"
      disabled={disableClick}
      onClick={onClick}
      style={{ color: "black" }}
    >
      {value}
    </button>
  );
}
