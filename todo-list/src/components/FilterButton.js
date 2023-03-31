import React from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn btn-secondary"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
        <span className="visually-hidden">Mostra </span>
        <span>{props.name}</span>
        <span className="visually-hidden">Attività</span>
    </button>
  );
}

export default FilterButton;