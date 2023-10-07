import React, { useState } from 'react';
import './App.css';
import TaskList from './TaskList';
import NewTask from './NewTask';

function App() {

  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    const task = {newTask, id: tasks.length + 1, completed: false}
    setTasks([...tasks, task]);
  }


  return (
    <div className="App">
      <NewTask onTaskAdd={handleAddTask} />
      <TaskList />
    </div>
  );
}

export default App;
