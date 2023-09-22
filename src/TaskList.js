import './TaskList.css';
import React from 'react';

function TaskList() {
    return (
        <div>
            <div className='AddButton'>
                <h1>Task Manager</h1>
                <button type="button">add</button>
            </div>
            <hr class="solid"></hr>
        </div>
        
    );
}

export default TaskList;