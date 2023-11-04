import React, { useState } from "react";
import './NewTask.css';
import Popup from "reactjs-popup";
import TaskDatePicker from './TaskDatePicker.js';

const NewTask = ({onTaskAdd}) => {
    // Information about the task to be added
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());

    /**
     * Passes the information gained from the user to the function passed in from the parent.
     * Resets the temporary storage afterwards.
     */
    const handleAddTask = () => {
        if(title && description && dueDate) {
            onTaskAdd({title, description, dueDate});
        }
        setTitle("");
        setDescription("");
        setDueDate(new Date());
    }

    /**
     * Function to handle recieving the date from the date picker element
     * 
     * @param {*} date The date to be set in the new task
     */
    const handleClosingDatePicker = (date) => {
        setDueDate(date);
    }

    return (
        <div>
            <Popup modal nested position="right" trigger= {<button id="newTask"> New Task </button>}>
                {
                    close => (
                        <div class='modal'>
                                <div class='content'>
                                    <input 
                                        id="title" 
                                        placeholder="Title" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        />
                                    <textarea 
                                        id="desc" 
                                        placeholder="Description" 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        />
                                    <TaskDatePicker value={dueDate} id="date" onClosingDatePicker={handleClosingDatePicker}/>
                                </div>
                            <div>
                                <button trigger className="btn" type="submit" onClick=
                                    {() => {
                                        handleAddTask();
                                        close();
                                    }}>
                                        New Task
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
};
export default NewTask;