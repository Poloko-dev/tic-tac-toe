import React from "react";

export default function Square({ value, onClick, disableClick }) {
  return (
    <button
      className="square"
      disabled={disableClick}
      onClick={onClick}
      style={{
        color: value === "X" ? "green" : value === "O" ? "red" : "black",
        fontSize: "8rem",
      }}
    >
      {value}
    </button>
  );
}
