import './TaskList.css';
import React from 'react';
import { useState, useEffect } from "react";
import "./App.css";
import NewTask from './NewTask';
import Popup from 'reactjs-popup';
import TaskDatePicker from './TaskDatePicker';
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";


function TaskList() {
  // where the retrieved tasks are stored
  const [posts, setPosts] = useState([]);

  // fetches the tasks from the database, placeholder url until further notice
  useEffect(() => {
    fetch('http://localhost:3001/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTaskList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Keep track of current ID to keep them unique
  const [globalID, setGlobalID] = useState(0);

  // Store taskItem objects instead of plain tasks.
  const [taskLists, setTaskList] = useState([]);

  // Temp storage of task information for modifying tasks
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(new Date());
  const [newCompleted, setNewCompleted] = useState(false);

  // definition of a task
  class taskItem {
    constructor(taskName, taskDesc, dueDate, id) {
      this.taskName = taskName;
      this.taskDesc = taskDesc;
      this.dueDate = dueDate;
      this.id = id;
      this.completed = false;
    }
  }

  /**
   * Displays the edit fields and sets the current id of the task being edited
   * 
   * @param {*} _id The id of the task that's going to be edited
   */

  const handleEdit = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          taskName: newTaskName,
          taskDesc: newTaskDesc,
          dueDate: newTaskDate,
          completed: newCompleted
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTask = await response.json();
      setTaskList(taskLists.map((task) => (task._id === _id ? updatedTask : task)));
      setNewTaskName("");
      setNewTaskDesc("");
      setNewTaskDate(new Date());
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  /**
   * Deletes the task specified by the id from the list
   * 
   * @param {*} id The id of the task to be deleted
   */
  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTaskList(taskLists.filter((task) => task._id !== _id));
      } else {
        throw new Error('Deletion failed');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  /**
   * Function to handle adding a task from the NewTask popup
   * 
   * @param {*} newTask The task to be added to the list
   */


  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          taskName: newTask.title,
          taskDesc: newTask.description,
          dueDate: newTask.dueDate,
          completed: false
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTaskList((taskLists) => [data, ...taskLists]);
      setGlobalID(globalID+1);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

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
  const initializeNewValues = (name, desc, date, completed) => {
    setNewTaskName(name);
    setNewTaskDesc(desc);
    setNewTaskDate(date);
    setNewCompleted(completed);
  }

  return (
    <>
            <body>
            <div id="main-container">
                <div id="sidebar">
                    <ul>
                        <li class="item"><NewTask onTaskAdd={handleAddTask}/></li>
                        <li class="item">All Tasks</li>
                        <li class="item">In-Progress</li>
                        <li class="item">Completed</li>
                    </ul>
                </div>
                    <div id="task-container">
                    <table>
                        <tr>
                            <th><span >Task</span></th>
                            <th><span >Description</span></th>
                            <th><span >Date</span></th>
                            <th><span >Status</span></th>
                        </tr>
                        {taskLists.map((task) => (
                        <tr>
                            <td id="task-title">
                                <span><FaRegTrashAlt id='delete-btn' style={{color: "#999999"}} onClick={() => handleDelete(task._id)}/></span>
                                <Popup modal nested position="right" onOpen={() => initializeNewValues(task.taskName, task.taskDesc, task.dueDate, task.completed)} trigger={<span><FaEdit id='edit-btn' style={{color: "#999999"}}/></span>}>
                                  {
                                      close => (
                                          <div class='modal'>
                                                  <div class='content'>
                                                      <input 
                                                          id="title"  
                                                          type="text"
                                                          defaultValue={task.taskName}
                                                          onChange={(e) => setNewTaskName(e.target.value)}
                                                          maxlength="20"
                                                          />
                                                      <textarea 
                                                          id="desc" 
                                                          defaultValue={task.taskDesc}
                                                          onChange={(e) => setNewTaskDesc(e.target.value)} 
                                                          maxlength="160"
                                                          />
                                                      <TaskDatePicker onClosingDatePicker={handleClosingDatePicker}/>
                                                  </div>
                                              <div>
                                              <button trigger id="edit" className="btn" type="button" onClick={() => 
                                                {
                                                  handleEdit(task._id);
                                                  close();
                                                  }
                                                }
                                                > Edit </button>
                                              </div>
                                          </div>
                                      )
                                  }
                              </Popup>
                                <input type="checkbox" checked={task.completed} onChange={() => handleComplete(task)}/>
                                <span id="title-text">{task.taskName}</span>
                            </td>
                            <td><span>{task.taskDesc}</span></td>
                            <td><span>{task.dueDate ? new Date(task.dueDate).toDateString("en-US") : 'No date'}</span></td>
                            <td>
                                <span id={task.completed ? 'completed' : 'in-progress'}>{task.completed ? 'Completed' : 'In-Progress'}</span>
                            </td>
                        </tr>
                        ))}
                    </table>
                </div>
            </div>
        </body>
        {/* Button to add a new task to the list */}
      {/* Map and display the tasks to a list */}
      {/* {taskLists.map((task) => (
        <li key={task._id}>
          <input type="checkbox" checked={task.completed} onChange={() => handleComplete(task)}/>
          <span id="title">{task.taskName+" "}</span>
          <span id='desc'>{task.taskDesc+" "}</span>
          <div id='right'>
            <span id='inProgress'>{task.completed ? 'Completed' : 'In-Progress'}</span>
            <span id='date'>{task.dueDate ? new Date(task.dueDate).toDateString("en-US") : 'No date'}</span>
            <button className="btn" id='delete' type="button" onClick={() => handleDelete(task._id)}> Delete </button>
            <Popup modal nested position="right" onOpen={() => initializeNewValues(task.taskName, task.taskDesc, task.dueDate, task.completed)} trigger={<button id="edit" className="btn"> Edit </button>}>
              {
                  close => (
                      <div class='modal'>
                              <div class='content'>
                                  <input 
                                      id="title"  
                                      type="text"
                                      defaultValue={task.taskName}
                                      onChange={(e) => setNewTaskName(e.target.value)}
                                      maxlength="20"
                                      />
                                  <textarea 
                                      id="desc" 
                                      defaultValue={task.taskDesc}
                                      onChange={(e) => setNewTaskDesc(e.target.value)} 
                                      maxlength="160"
                                      />
                                  <TaskDatePicker onClosingDatePicker={handleClosingDatePicker}/>
                              </div>
                          <div>
                          <button trigger id="edit" className="btn" type="button" onClick={() => 
                            {
                              handleEdit(task._id);
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
      ))} */}
      {/* Elements to allow users to enter new information for a task */}
  
    </>
  );
}

export default TaskList;