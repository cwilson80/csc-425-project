import './TaskList.css';
import React from 'react';
import { useState } from "react";
import "./App.css"
import Task from './Task.js';

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
            <input type="checkbox" className="checkbox"/>
            <label className="select">Select All</label>
            <Task></Task>
            <Task></Task>
        </>
        
    );
}

export default TaskList;