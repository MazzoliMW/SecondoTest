import React from "react";

export default function Todo(props){
  return(
    <li className="todo stack-small">
        <div className="c-cb form-check">
            <input className="form-check-input" type="checkbox" value="" id={props.id} defaultChecked={props.completed} />
            <label className="todo-label form-check-label" htmlFor="todo-0">
                {props.name}
            </label>
        </div>
        <div className="btn-group">
            <button type="button" className="btn btn-outline-info">
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button type="button" className="btn btn-outline-danger">
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
        </div>
    </li>
  );
}