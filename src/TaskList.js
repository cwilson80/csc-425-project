import './TaskList.css';
import React from 'react';
import { useState } from "react";
import "./App.css";
import NewTask from './NewTask';
import Popup from 'reactjs-popup';
import TaskDatePicker from './TaskDatePicker';

function TaskList() {

  // Keep track of current ID to keep them unique
  const [globalID, setGlobalID] = useState(0);

  // Store taskItem objects instead of plain tasks.
  const [taskLists, setTaskList] = useState([]);

  // Temp storage of task information for modifying tasks
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(new Date());

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
     * Function to handle recieving the date from the date picker element
     * 
     * @param {*} date The date to be set in the new task
     */
  const handleClosingDatePicker = (date) => {
    setNewTaskDate(date);
  }

  const handleComplete = (t) => {
    t.completed = !t.completed;
    setTaskList((prev) => [...prev]);
}




  /**
   * Sets the values to be used in edit
   * 
   * @param {*} name The name to be set
   * @param {*} desc The description to be set
   * @param {*} date The date to be set
   */
  const initializeNewValues = (name, desc, date) => {
    setNewTaskName(name);
    setNewTaskDesc(desc);
    setNewTaskDate(date);
  }

  return (
    <>
    
      <div className='AddButton'>
        <h1>Task Manager</h1>
      </div>
      <br></br>
      <div>
        {/* Button to add a new task to the list */}
        <NewTask onTaskAdd={handleAddTask}/>
      </div>
      {/* Map and display the tasks to a list */}
      {taskLists.map((task) => (
        <li key={task.id}>
          <input type="checkbox" onChange={() => handleComplete(task)}/>
          <span>{task.taskName+" "}</span>
          <span id='desc'>{task.taskDesc+" "}</span>
          <div id='right'>
            <span id='inProgress'>{task.completed ? 'Completed' : 'In-Progress'}</span>
            <span id='date'>{task.dueDate.toDateString("en-US")}</span>
            <button className="btn" id='delete' type="button" onClick={() => handleDelete(task.id)}> Delete </button>
            <Popup modal nested position="right" onOpen={() => initializeNewValues(task.taskName, task.taskDesc, task.dueDate)} trigger={<button id="edit" class="btn"> Edit </button>}>
              {
                  close => (
                      <div class='modal'>
                              <div class='content'>
                                  <input 
                                      id="title"  
                                      type="text"
                                      defaultValue={task.taskName}
                                      onChange={(e) => setNewTaskName(e.target.value)}
                                      />
                                  <textarea 
                                      id="desc" 
                                      defaultValue={task.taskDesc}
                                      onChange={(e) => setNewTaskDesc(e.target.value)} 
                                      />
                                  <TaskDatePicker onClosingDatePicker={handleClosingDatePicker}/>
                              </div>
                          <div>
                          <button trigger id="edit" className="btn" type="button" onClick={() => 
                            {
                              handleEdit(task.id);
                              close();
                              }
                            }
                            > Edit </button>
                          </div>
                      </div>
                  )
              }
          </Popup>
          </div>
        </li>
      ))}

      {/* Elements to allow users to enter new information for a task */}
  
    </>
  );
}

export default TaskList;