import './App.scss';
import { nanoid } from "nanoid";
import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  Tutte: () => true,
  Attive: (task) => !task.completed,
  Complete: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {  
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('Tutte');

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

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'rimaste' : 'rimasta';
  const headingText = `${taskList.length} attività ${tasksNoun} `;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (    
    <div className="App">
      <header className="App-header">
        <h1>TodoMatic</h1>
        <Form addTask={addTask} />
        <div className="spacer">
            <div className="filters btn-group stack-exception">
              {filterList}
            </div> 
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
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
