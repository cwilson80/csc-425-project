import './TaskList.css';
import React from 'react';
import { useState } from "react";
import "./App.css"
import Task from './Task.js';
import NewTask from './NewTask'

function TaskList() {

  // Separate State Variables for Each Input
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Store taskItem objects instead of plain tasks.
  const [taskLists, setTaskList] = useState([])

  class taskItem {
      constructor(taskName, taskDesc, dueDate) {
          this.taskName = taskName;
          this.taskDesc = taskDesc;
          this.dueDate = dueDate.toString();
          this.id = taskLists.length + 1;
          this.completed = false
      }
  }

  const handleClick = () => {
      // Create new taskItem
      const newTask = new taskItem(taskName, taskDesc, dueDate);
      // Add the new taskItem to the taskLists
      setTaskList((prev) => [...prev, newTask]);

      // Clear the input fields
      setTaskName("");
      setTaskDesc("");
      setDueDate("");
  };

  const handleAddTask = (newTask) => {
    const task = new taskItem(newTask.title, newTask.description, newTask.dueDate)
    setTaskList((prev) => [...prev, task]);
  }

  return (
      <>
          <div className='AddButton'>
              <h1>Task Manager</h1>
          </div>
          <h2>Tasks <NewTask onTaskAdd={handleAddTask}/></h2>
          <hr class="solid"></hr>
          <input type="checkbox" className="checkbox"/>
          <label className="select">Select All</label>
          {/* Dynamically render tasks */}
          {taskLists.map((task, index) => (
              <Task key={index} task={task} />
          ))}
      </>
  );
}

export default TaskList;