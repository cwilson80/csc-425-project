import './TaskList.css';
import React from 'react';
import { useState, useEffect, useRef } from "react";
import "./App.css";
import NewTask from './NewTask';
import Popup from 'reactjs-popup';
import TaskDatePicker from './TaskDatePicker';
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbCircleCheck } from "react-icons/tb";
import { TbProgress } from "react-icons/tb";
import dateFormat, { masks } from "dateformat";
import { FaBars } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { TbTextPlus } from "react-icons/tb";
import { MdExpandMore } from "react-icons/md";
import { GiAnvil } from "react-icons/gi";



function TaskList() {
  // where the retrieved tasks are stored

  // fetches the tasks from the database, placeholder url until further notice
  useEffect(() => {
    fetch('http://localhost:3001/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDateFormat(dateFormat(taskItem.dueDate, "mmmm dS, yyyy"));
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
  const [newDateFormat, setDateFormat] = useState();
  const [overflow, setOverflow] = useState(false);

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

  const handleComplete = async (t) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${t._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: !t.completed
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTask = await response.json();
      setTaskList(taskLists.map((task) => (task._id === t._id ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
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



    useEffect( () => {
  //   function checkOverflow() {       
  //     if() {
  //       if (check(this.overflowComponent)) { 
  //           console.log("overflow"); 
  //       }  else {
  //         console.log("no overflow")
  //       }                 
  //     }
  // }     
  //   if(document.getElementById(this.overflowComponent)) {
  //     window.addEventListener('resize', checkOverflow);
  //   }
  //   window.addEventListener('resize', checkOverflow);
  
  
    const setWidth = () => {
      if(window.innerWidth > 1000) {
        setDateFormat(dateFormat(taskItem.dueDate, "mmmm dS, yyyy"));
       // document.getElementById("date-format").style.width = "250px";
      } else {
        setDateFormat("" + dateFormat(taskItem.dueDate, "mm") + "/" + dateFormat(taskItem.dueDate, "d") + "/" + dateFormat(taskItem.dueDate, "yy"));
        // document.getElementById("date-format").style.width = "50px";

      }
    }
    window.addEventListener('resize', setWidth)

  })


               
  function check(e) { 
    if(e != null) {
      var overflowState = e.style.overflow;  
      if ( !overflowState || overflowState === "visible" ) 
          e.style.overflow = "hidden"; 
      var isOverflowing = e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight; 
      e.style.overflow = overflowState; 
      setOverflow(isOverflowing);
    }
    else {
      setOverflow(false);
    }
  } 


  function formatTheDate(tDate) {
    if(window.innerWidth > 1000) {
      return dateFormat(tDate, "mmmm dS, yyyy");
     // document.getElementById("date-format").style.width = "250px";
    } else {
      return dateFormat(tDate, "m") + "/" + dateFormat(tDate, "d") + "/" + dateFormat(tDate, "yy");
      // document.getElementById("date-format").style.width = "50px";
    }
  }


  return (
    <>
            <body>
            <div id="main-container">
                {/* <div id="sidebar">
                    <ul>
                        <li class="item">All Tasks</li>
                        <li class="item">In-Progress</li>
                        <li class="item">Completed</li>
                    </ul>
                </div> */}
                    <div id="task-container">
                    <div id='header'>
                      <h1><span><GiAnvil size={40} id='anvil'/></span>Focus Forge</h1>
                      <NewTask onTaskAdd={handleAddTask}/>
                    </div>
                    <table>
                        <tr>
                            <th id="title-column"><span>Task</span></th>
                            <th id="desc-column"><span>Description</span></th>
                            <th id="date-column"><span >Date</span></th>
                            <th id="status-column"><span >Status</span></th>
                        </tr>
                        {taskLists.map((task) => (
                        <tr>
                            <td id="task-title">
                              <div id="desktop-title-width">
                                <FaRegTrashAlt id='delete-btn' style={{color: "#999999"}} onClick={() => handleDelete(task._id)}/>
                                <Popup modal nested position="right" onOpen={() => initializeNewValues(task.taskName, task.taskDesc, task.dueDate, task.completed)} trigger={<span><FaEdit id='edit-btn' style={{color: "#999999"}}/></span>}>
                                  {
                               closeEdit => (
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
                                                      <div id="calender-container"><FaCalendarDays id="calender"/><TaskDatePicker onClosingDatePicker={handleClosingDatePicker}/></div>
                                                  </div>
                                              <div>
                                              <button trigger id="edit" className="btn" type="button" onClick={() => 
                                                {
                                                  handleEdit(task._id);
                                                  closeEdit();
                                                  }
                                                }
                                                > Edit </button>
                                              </div>
                                          </div>
                                )
                                  }
                              </Popup>
                                  <label><input id="complete-check-style" type="checkbox" checked={task.completed} onChange={() => handleComplete(task)}/></label>
                                  <span className='table-cell'>
                                    {task.taskName}
                                  </span>
                                  </div>
                                {/* <RiPlayListAddFill id="dropdown"/> */}
                                <div id="mobile-title-width" className='table-cell'>
                                  <div id='phone-width'>
                                    <Popup nested modal trigger={<span><FaBars id="options-mobile" /></span>}>
                                    {
                                        close => (
                                            <div class='mobile-modal'>
                                                    <div class='mobile-content'>
                                                        <button id="mobile-delete" className='btn-modal' onClick={() => {handleDelete(task._id)}}><FaRegTrashAlt id='delete-btn'/>Remove</button>
                                                        
                                                        <Popup modal nested position="right" onOpen={() => initializeNewValues(task.taskName, task.taskDesc, task.dueDate, task.completed)} trigger={<button id="mobile-edit" className='btn-modal'><FaEdit id='edit-btn'/>Edit</button>}>
                                                                  {
                                                                      closeEdit => (
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
                                                                                    <div id="calender-container"><FaCalendarDays id="calender"/><TaskDatePicker onClosingDatePicker={handleClosingDatePicker}/></div>
                                                                                  </div>
                                                                              <div>
                                                                              <button trigger id="edit" className="btn" type="button" onClick={() => 
                                                                                {
                                                                                  close();
                                                                                  handleEdit(task._id);
                                                                                  closeEdit();
                                                                                  }
                                                                                }
                                                                                > Edit </button>
                                                                              </div>
                                                                          </div>
                                                                      )
                                                                  }
                                                        </Popup>
                                                        <button className='btn-modal' id={task.completed ? 'mobile-complete-icon' : 'mobile-progress-icon'} onClick={() => {handleComplete(task); close();}}>
                                                          {task.completed ? <TbProgress size={16} id="modal-complete-icon" className='mobile-icons-style'/> : <TbCircleCheck size={16} id="modal-progress-icon" className='mobile-icons-style'/>}
                                                            {task.completed ? "Mark As In-Progress" : "Mark As Complete"}
                                                        </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    </Popup>
                                    <span id='phone-width-title'>
                                      {task.taskName}
                                    </span>
                                    </div>
                                  <div id='title-column-desc'>
                                  {task.taskDesc}
                                </div>
                              </div>
                            </td>
                            <td id="test">
                                  <label>
                                    <input id="descInput" type="checkbox" />
                                    <div id="detectOverflow" className="contentDesc"><span>{task.taskDesc}</span></div>
                                  </label>
                                </td>
                            <td className="table-cell">
                              <span id="date-format" className='table-cell'>
                              {formatTheDate(task.dueDate)}
                                                            </span>
                              {/* This is the date and it changes format depending on size and so does the column size */}
                            </td>
                            <td id="parent-status" className="table-border-right">
                                <span className='table-cell' id={task.completed ? 'completed' : 'in-progress'}>{task.completed ? 'Completed' : 'In-Progress'}</span>
                                <span className='table-cell'>{task.completed ? <TbCircleCheck size={20} className="modal-icon" id="complete-icon"/> : <TbProgress size={20}  className="modal-icon" id="progress-icon"/>}</span>
                            </td>
                        </tr>
                        ))}
                    </table>
                </div>
            </div>
        </body>
    </>
  );
}

export default TaskList;