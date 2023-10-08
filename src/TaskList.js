import './TaskList.css';
import React from 'react';
import { useState } from "react";
import "./App.css"
import Task from './Task.js';
import NewTask from './NewTask'

function TaskList() {

  // Separate State Variables for Each Input
  const [globalID, setGlobalID] = useState(0);

  // Store taskItem objects instead of plain tasks.
  const [taskLists, setTaskList] = useState([])

  class taskItem {
      constructor(taskName, taskDesc, dueDate, id) {
          this.taskName = taskName;
          this.taskDesc = taskDesc;
          this.dueDate = dueDate;
          this.id = id;
          this.completed = false
      }
  }

  const handleEdit = (newTask, id) => {
    let i = 0;
        for(i = 0; i < taskLists.length; i++) {
            if(taskLists[i].id === id) {
                taskLists[i].taskName = newTask.title;
                taskLists[i].taskDesc = newTask.description
                taskLists[i].dueDate = newTask.dueDate
            }
        }
  }

  const handleDelete = (id) => {
    let i = 0;
    for(i = 0; i < taskLists.length; i++) {
        if(taskLists[i].id === id) {
            taskLists.splice(i, i);
        }
    }
  }

  const handleAddTask = (newTask, id) => {
    const task = new taskItem(newTask.title, newTask.description, newTask.dueDate, globalID);
    setGlobalID(globalID+1);
    setTaskList((prev) => [...prev, task]);
  }

  return (
      <>
          <div className='AddButton'>
              <h1>Task Manager</h1>
          </div>
          <h2>Tasks <NewTask onTaskAdd={handleAddTask} id={-1}/></h2>
          <hr class="solid"></hr>
          <input type="checkbox" className="checkbox"/>
          <label className="select">Select All</label>
          {/* Dynamically render tasks */}
          {taskLists.map((task, index) => (
              <Task key={index} task={task} onEdit={handleEdit} onDelete={handleDelete}/>
          ))}
      </>
  );
}

export default TaskList;