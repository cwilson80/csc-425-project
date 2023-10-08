import './App.css';
import NewTask from './NewTask';
import React, { useState } from 'react';
import './App.css';
import TaskList from './TaskList';
import Task from './Task';

function App() {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (newTask) => {
    const task = {newTask, id: tasks.length + 1, completed: false}
    setTasks([...tasks, task]);
  }

  const handleEditTask = (editedTask) => {
    setTasks(tasks.map((task) => (task.id === editedTask.id ? editedTask : task)));
    setSelectedTask(null);
  };


  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };


  return (
    <div className="App">
      <NewTask onTaskAdd={handleAddTask}/>
    </div>
  );
}

export default App;
