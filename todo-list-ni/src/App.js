import './App.css';
import React, { Component } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

const FILTER_MAP = {
  Tutte: () => true,
  Attive: (task) => !task.completed,
  Complete: (task) => task.completed
};   
const FILTER_NAMES = Object.keys(FILTER_MAP);

class App extends Component{
  constructor(props) {
    super(props);    
    this.state = {
      tasks: props.tasks,
      filter: 'Tutte'
    };
  }
    
  taskList = () => {    
    const tastksState = this.state.tasks
    return tastksState.filter(FILTER_MAP[this.state.filter]).map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={this.toggleTaskCompleted}
        deleteTask={this.deleteTask}
        editTask={this.editTask}
      />
    ))
  };

  componentDidUpdate(prevProp, prevState, snapshot){
    if (prevState.tasks !== this.state.tasks) {
      if (prevState.length - prevState.tasks === -1) {
        this.headingText.current.focus();
      }
    }
  }
  toggleTaskCompleted = (id) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    this.setState({tasks: updatedTasks});
  }
  deleteTask = (id) => {
    const remainingTasks = this.state.tasks.filter((task) => id !== task.id);
    this.setState({tasks: remainingTasks});
  }
  editTask = (id, newName) => {
    const editedTaskList = this.state.tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    this.setState({tasks: editedTaskList });
  }
  addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    this.setState(prevState => ({ tasks: [...prevState.tasks, newTask] }));
  }
  setFilter = (name) => {
    switch(name){
      case "Tutte":
        this.setState({ filter : "Tutte" });
        break;
      case "Attive":
        this.setState({ filter : "Attive" });
        break;
      case "Complete":
        this.setState({ filter : "Complete" })
        break;
      default:
        this.setState({ filter : "Tutte" });        
    }
  }
	render() {  
    const conteggio = this.taskList().length;
    const tasksNoun = this.taskList().length !== 1 ? 'rimaste' : 'rimasta';
    const headingText = `${conteggio} attività ${tasksNoun}`;
    //const prevTaskLength = this.tasks;
    const filterList = FILTER_NAMES.map(name => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === this.filter}
        setFilter={this.setFilter}
      />
    ));
		return (
			<div className="App">
				<header className="App-header">
				<h1>TodoMatic</h1>
        <Form addTask={this.addTask} />
				<div className="spacer">
					<div className="filters btn-group stack-exception">
						{filterList}
					</div> 
				</div>
				<h2 id="list-heading" tabIndex="-1" ref={this.listHeadingRef}>{headingText}</h2>
				<ul
					className="todo-list stack-exception"
					aria-labelledby="list-heading"
				>
					{this.taskList()}
				</ul>
				</header>
			</div>
		);
	}
}
export default App;