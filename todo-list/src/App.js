import './App.css';
import { nanoid } from "nanoid";
import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {  
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    )
  );

  const tasksNoun = taskList.length !== 1 ? 'rimaste' : 'rimasta';
  const headingText = `${taskList.length} attività ${tasksNoun} `;

  return (    
    <div className="App">
      <header className="App-header">
        <h1>TodoMatic</h1>
        <Form addTask={addTask} />
        <div className="spacer">
            <div className="filters btn-group stack-exception">
              <FilterButton name="Tutte" style="btn toggle-btn btn-dark"/>
              <FilterButton name="Attive" style="btn toggle-btn btn-secondary"/>
              <FilterButton name="Complete" style="btn toggle-btn btn-light"/>
            </div> 
        </div>
        <h2 id="list-heading">{headingText}</h2>
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
