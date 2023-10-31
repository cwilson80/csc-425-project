import React from 'react';
import "./Task.css";
import NewTask from './NewTask';

    const Task = ({ task, onEdit, onDelete }) => (
        <form className = "tasks">
            <p type="checkbox" />
            <p className='TaskName'>Name: {task.taskName}</p>
            <p className='Description'>Description: {task.taskDesc}</p>
            <p> Due Date: {task.dueDate.toString()} </p>
            <div className='container'>
                <button onClick={() => onEdit(task)} className="btn" id='edit'>Edit</button>
                <button onClick={() => onDelete(task.id)} className="btn" id='delete'>Delete</button>
            </div>
            <br></br>
        </form>
    );

export default Task;