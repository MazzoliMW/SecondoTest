import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props){
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);
  function handleChange(e) {
    setNewName(e.target.value);
  }  
  function handleSubmit(e) {
    if(newName===''){
      setEditing(false);
      alert("Inserire nome");
    }else{
      e.preventDefault();
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }
  }
  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
    }
  }, [isEditing]);

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
          ref={editFieldRef}
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
              ref={editButtonRef}
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
  console.log("main render");
}