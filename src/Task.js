import React from 'react';
import "./Task.css"
    const Task = ({ task, onEdit, onDelete }) => (
        <form className = "tasks">
            <p type="checkbox" />
            <p className='TaskName'>{task.title}</p>
            <p className='Description'>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <div className='container'>
                <button onClick={() => onEdit(task)} className="btn" id='edit'>Edit</button>
                <button onClick={() => onDelete(task.id)} className="btn" id='delete'>Delete</button>
            </div>
            <br></br>
        </form>
    );

export default Task;