import './TaskList.css';
import React from 'react';
import { useState, useEffect } from "react";
import "./App.css";
import NewTask from './NewTask';
import Popup from 'reactjs-popup';
import TaskDatePicker from './TaskDatePicker';

function TaskList() {
  // where the retrieved tasks are stored
  const [posts, setPosts] = useState([]);

  // fetches the tasks from the database, placeholder url until further notice
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
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

  const handleEdit = async (id) => {
    await fetch('', {
      method: 'POST',
      body: JSON.stringify({
        title: newTaskName,
        desc: newTaskDesc,
        date: newTaskDate,
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
    .then((response) => response.json())
    .then((data) => {
       this.setState({ id: data.id});
    })
    .catch((err) => {
       console.log(err.message);
    });
    setNewTaskName("");
    setNewTaskDesc("");
    setNewTaskDate(new Date());
  }

  /**
   * Deletes the task specified by the id from the list
   * 
   * @param {*} id The id of the task to be deleted
   */
  const handleDelete = async (id) => {
    let response = await fetch(
       `${id}`, //api url will go here
       {
          method: 'DELETE',
       }
    );
    if (response.status === 200) {
       setTaskList(
          taskLists.filter((task) => {
             return task.id !== id;
          })
       );
    } else {
       return;
    }
 };

  /**
   * Function to handle adding a task from the NewTask popup
   * 
   * @param {*} newTask The task to be added to the list
   */


  const handleAddTask = async (newTask) => {
    await fetch('', {
       method: 'POST',
       body: JSON.stringify({
          title: newTask.title,
          desc: newTask.desc,
          date: newTask.date,
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    })
       .then((response) => response.json())
       .then((data) => {
          setTaskList((taskLists) => [data, ...taskLists]);
       })
       .catch((err) => {
          console.log(err.message);
       });
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
  const initializeNewValues = (name, desc, date) => {
    setNewTaskName(name);
    setNewTaskDesc(desc);
    setNewTaskDate(date);
  }

  return (
    <>
    <div className='container'>
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
          <span id="title">{task.taskName+" "}</span>
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
      </div>
      {/* Elements to allow users to enter new information for a task */}
  
    </>
  );
}

export default TaskList;