import React from 'react';
import "./Task.css"

function Task() {
    return (
        <form className = "tasks">
            <input type="checkbox" />
            <label className='TaskName'>Place Holder for Task</label>
            <label className='Description'> desciption of task </label>
            <button>Edit</button>
            <button>Delete</button>
            <br></br>
        </form>
    );
}

export default Task;