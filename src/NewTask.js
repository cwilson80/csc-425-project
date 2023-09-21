import React from "react";
import './NewTask.css';
import Popup from "reactjs-popup";

function NewTask() {
    return (
        <div>
            <Popup trigger=
                {<button> Click to open modal </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                <button id="dueDate">Date</button>
                                <form>
                                    <input placeholder="Title"></input>
                                    <input placeholder="Desciprtion"></input>
                                </form>
                            </div>
                            <div>
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