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

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  

  class taskItem {
      constructor(taskName, taskDesc, dueDate, id) {
          this.taskName = taskName;
          this.taskDesc = taskDesc;
          this.dueDate = dueDate;
          this.id = id;
          this.completed = false
      }
  }

  const handleEdit = () => {
    document.getElementById("editDiv").style.display = "block";
  }

  function handleDelete(id) {
    const newTaskList = taskLists.filter((item) => item.id !== id);
    setTaskList(newTaskList);
  }

  const handleAddTask = (newTask, id) => {
    const task = new taskItem(newTask.title, newTask.description, newTask.dueDate, globalID);
    setGlobalID(globalID+1);
    setTaskList((prev) => [...prev, task]);
  }

  const Change = (id)=>{
    let i = 0;
    for(i = 0; i < taskLists.length; i++) {
        if(taskLists[i].id === id) {
            taskLists[i].taskName = newTaskName;
            taskLists[i].taskDesc = newTaskDesc;
            taskLists[i].dueDate = new Date();
        }
    }
    setNewTaskName("");
    setNewTaskDesc("");
    document.getElementById("editDiv").style.display = "none";
  }

  return (
      <>
          <div className='AddButton'>
              <h1>Task Manager</h1>
          </div>
          <h2>Tasks</h2>
          <hr class="solid"></hr>
          <NewTask onTaskAdd={handleAddTask} id={-1}/>
          {/* Dynamically render tasks */}
          {taskLists.map((task) => (
            <li key={task.id}>
                <input type="checkbox"/>
                <span>{task.taskName+": "}</span>
                <span>{task.taskDesc+" "}</span>
                <span>{task.dueDate.toLocaleDateString("en-US")}</span>
                <button className="btn" id='delete' type="button" onClick={() => handleDelete(task.id)}> Delete </button>
                <button className="btn" id='edit' type="button" onClick={() => handleEdit()}> Edit </button>
                <div id="editDiv">
                <input
          type="text"
          id="newTaskname"
          placeholder="Enter task name to edit"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <input
          type="text"
          id="newTaskdesc"
          placeholder="Enter task description"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
        />
                  <button onClick={()=>Change(task.id)}>Change</button>
                </div>
            </li>
          ))}
      </>
  );
}

export default TaskList;