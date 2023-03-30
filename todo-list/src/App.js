import './App.css';
// cioao
import React from "react";
import Top from "./components/Top";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {  
  const taskList = props.tasks.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
      />
    )
  );
  return (
    
    <div className="App">
      <header className="App-header">
      <h1>TodoMatic</h1>
      <Form />
      <div className="spacer">
          <div className="filters btn-group stack-exception">
            <FilterButton name="All" style="btn toggle-btn btn-dark"/>
            <FilterButton name="Active" style="btn toggle-btn btn-secondary"/>
            <FilterButton name="Completed" style="btn toggle-btn btn-light"/>
          </div> 
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
      </header>
    </div>
  );
}

export default App;
