import React from 'react';
import "./Task.css"

function Task() {
    return (
        <form className = "tasks">
            <input type="checkbox" />
            <label className='TaskName'>Place Holder for Task</label>
            <label className='Description'> desciption of task </label>
            <div className='container'>
                <button>Edit</button>
                <button>Delete</button>
            </div>
            <br></br>
        </form>
    );
}

export default Task;