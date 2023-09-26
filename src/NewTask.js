import React, { useState } from "react";
import './NewTask.css';
import Popup from "reactjs-popup";
import TaskDatePicker from './TaskDatePicker.js';

function NewTask() {

    return (
        <div>
            <Popup trigger=
                {<button> Add Task </button>}
                modal nested>
                {
                    close => (
                        <div class='modal'>
                            <div class='content'>
                                <input id="title" placeholder="Title"></input>
                                <textarea id="desc" placeholder="Desciprtion"></textarea>
                            </div>
                            <div>
                                <TaskDatePicker />
                                <button type="submit" onClick=
                                    {() => close()}>
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