import React, { useState } from "react";
import './NewTask.css';
import Popup from "reactjs-popup";
import TaskDatePicker from './TaskDatePicker.js';

function NewTask() {

    const [formData, setFormData] = useState({title: "", description: ""});

    const handleChange = (e) => {
        setFormData(e.target.value);
   }

    const handleSubmit = (e) => {
        alert(`Title: ${formData.title}`);
    }

    return (
        <div>
            <Popup trigger=
                {<button> Add Task </button>}
                modal nested>
                {
                    close => (
                        <div class='modal'>
                            <form onSubmit={handleSubmit}>
                                <div class='content'>
                                    <input 
                                        id="title" 
                                        placeholder="Title" 
                                        value={formData.title}
                                        onChange={handleChange}    
                                        />
                                    <textarea 
                                        id="desc" 
                                        placeholder="Description" 
                                        value={formData.description}
                                        onChange={handleChange}
                                        />
                                </div>
                                </form>
                            <div>
                                <TaskDatePicker />
                                <button type="submit" onClick=
                                    {handleSubmit}>
                                        Add Task
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