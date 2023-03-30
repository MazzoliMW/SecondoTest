import React from "react";

function FilterButton(props) {
  return (
    <button type="button" className={props.style} aria-pressed="true">
        <span className="visually-hidden">Mostra </span>
        <span>{props.name}</span>
        <span className="visually-hidden">Attività</span>
    </button>
  );
}

export default FilterButton;