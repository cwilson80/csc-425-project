import './TaskList.css';
import React from 'react';
import { useState } from "react";
import "./App.css";
import NewTask from './NewTask';
import TaskDatePicker from './TaskDatePicker';

function TaskList() {

  // Keep track of current ID to keep them unique
  const [globalID, setGlobalID] = useState(0);

  // Store taskItem objects instead of plain tasks.
  const [taskLists, setTaskList] = useState([])

  // Temp storage of task information for modifying tasks
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(new Date());
  const [presentId, setPresentId] = useState("");

  // definition of a task
  class taskItem {
    constructor(taskName, taskDesc, dueDate, id) {
      this.taskName = taskName;
      this.taskDesc = taskDesc;
      this.dueDate = dueDate;
      this.id = id;
      this.completed = false
    }
  }

  /**
   * Displays the edit fields and sets the current id of the task being edited
   * 
   * @param {*} id The id of the task that's going to be edited
   */
  const handleEdit = (id) => {
    document.getElementById("editDiv").style.display = "block";
    setPresentId(id);
  }

  /**
   * Deletes the task specified by the id from the list
   * 
   * @param {*} id The id of the task to be deleted
   */
  function handleDelete(id) {
    const newTaskList = taskLists.filter((item) => item.id !== id);
    setTaskList(newTaskList);
  }

  /**
   * Function to handle adding a task from the NewTask popup
   * 
   * @param {*} newTask The task to be added to the list
   */
  const handleAddTask = (newTask) => {
    const task = new taskItem(newTask.title, newTask.description, newTask.dueDate, globalID);
    setGlobalID(globalID+1);
    setTaskList((prev) => [...prev, task]);
  }

  /**
   * Function to update a task with the stored information from the inputs in the task list below.
   * Resets temporary storage of task infor for reuse, then hides the edit fields.
   * 
   * @param {*} id The id of the task being updated
   */
  const Change = (id)=>{
    let i = 0;
    for(i = 0; i < taskLists.length; i++) {
      if(taskLists[i].id === id) {
        taskLists[i].taskName = newTaskName;
        taskLists[i].taskDesc = newTaskDesc;
        taskLists[i].dueDate = newTaskDate;
      }
    }
    setNewTaskName("");
    setNewTaskDesc("");
    setNewTaskDate(new Date());
    setPresentId("");
    document.getElementById("editDiv").style.display = "none";
  }

  /**
   * Function to handle recieving the date from the date picker element
   * 
   * @param {*} date The date to be set in the new task
   */
  const handleClosingDatePicker = (date) => {
    setNewTaskDate(date);
  }

  return (
    <>
    
      <div className='AddButton'>
        <h1>Task Manager</h1>
      </div>
      <h2>Tasks</h2>
      <hr class="solid"></hr>

      {/* Button to add a new task to the list */}
      <NewTask onTaskAdd={handleAddTask}/>
      
      {/* Map and display the tasks to a list */}
      {taskLists.map((task) => (
        <li key={task.id}>
          <input type="checkbox"/>
          <span>{task.taskName+": "}</span>
          <span>{task.taskDesc+" "}</span>
          <span>{task.dueDate.toLocaleDateString("en-US")}</span>
          <button className="btn" id='delete' type="button" onClick={() => handleDelete(task.id)}> Delete </button>
          <button className="btn" id='edit' type="button" onClick={() => handleEdit(task.id)}> Edit </button>
        </li>
      ))}

      {/* Elements to allow users to enter new information for a task */}
      <div id="editDiv">
        {/* Input fields for updated task information */}
        <input
          type="text"
          id="newTaskname"
          placeholder="Enter new task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <input
          type="text"
          id="newTaskdesc"
          placeholder="Enter new task description"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
        />
        <TaskDatePicker onClosingDatePicker={handleClosingDatePicker}/>

        {/* Button to save user modifications */}
        <button onClick={()=>Change(presentId)}>Change</button>
      </div>
    </>
  );
}

export default TaskList;