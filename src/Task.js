import React from 'react';
import "./Task.css"

function Task() {
    return (
        <div className = "tasks">
            <input type="checkbox" />
            <label>Place Holder for Task</label>
            <button>Edit</button>
            <button>Delete</button>
            <br></br>
        </div>
    );
}

export default Task;