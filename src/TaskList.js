import './TaskList.css';
import React from 'react';
import { useState } from "react";
import "./App.css"

function TaskList() {

const [task, setTasks] = useState("")
const [taskLists, setTaskList] = useState([])

const handleClick = () => {
    const id = taskLists.length + 1;
    setTaskList((prev) => [
      ...prev,
      {
        id: id,
        task: task,
        complete: false,
      }
    ]);
    setTasks("");
  };



    return (
        <>
            <div className='AddButton'>
                <h1>Task Manager</h1>
                <input value={task} onInput={(e) =>setTasks(e.target.value)} />
                <button type="button" onClick={() => handleClick()}>add</button>
            </div>
            <h2>Tasks</h2>
            <hr class="solid"></hr>
            <input type="checkbox"/>
            <label>Place Holder for Task</label> 
            <button>Edit</button>
            <button>Delete</button>
        </>
        
    );
}

export default TaskList;