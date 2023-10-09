import React, { useState } from "react";
import './NewTask.css';
import Popup from "reactjs-popup";
import TaskDatePicker from './TaskDatePicker.js';

const NewTask = ({onTaskAdd}, {id}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());

      
    const handleAddTask = () => {
        if(title && description && dueDate) {
            onTaskAdd({title, description, dueDate}, id);
            setTitle("");
            setDescription("");
            setDueDate(new Date());
        }
    }

    const handleClosingDatePicker = (date) => {
        setDueDate(date);
    }

    const close = () => {
        handleAddTask();
        close();
    }

    return (
        <div>
            <Popup position="right" trigger= {<button className='btn'> New Task </button>}>
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
                                    <TaskDatePicker onClosingDatePicker={handleClosingDatePicker}/>
                                </div>
                            <div>
                                <button trigger className="buton" type="submit" onClick=
                                    {close}>
                                        Close Popup
                                </button>
                                <button trigger className="buton" type="submit" onClick=
                                    {handleAddTask}>
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