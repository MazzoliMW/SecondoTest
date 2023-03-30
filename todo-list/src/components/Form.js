import React, { useState } from "react";


function Form(props){
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return(
    <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
              Cosa deve essere fatto?
            </label>
        </h2>
        <div className="btn-group">
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg form-control"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg btn-primary">
                Aggiungi
            </button>
        </div>
    </form>
  );
}

export default Form;