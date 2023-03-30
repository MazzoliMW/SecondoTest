import React, { useState } from "react";

export default function Todo(props){
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  function handleChange(e) {
    setNewName(e.target.value);
  }  
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          Nuovo nome per {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text form-control"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel btn-outline-warning"
          onClick={() => setEditing(false)}
        >
          Cancella
          <span className="visually-hidden">rinomina {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit btn-outline-primary">
          Salva
          <span className="visually-hidden">nuovo nome per {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <li className="todo stack-small">
        <div className="c-cb form-check">
            <input 
              className="form-check-input"
              type="checkbox"
              value=""
              id={props.id}
              defaultChecked={props.completed} 
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label form-check-label" htmlFor="todo-0">
                {props.name}
            </label>
        </div>
        <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => setEditing(true)}
            >
              Modifica <span className="visually-hidden">{props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => props.deleteTask(props.id)}
            >
              Elimina <span className="visually-hidden">{props.name}</span>
            </button>
        </div>
    </li>
  );
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}