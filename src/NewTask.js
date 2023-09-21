import React from "react";
import './NewTask.css';
import Popup from "reactjs-popup";

function NewTask() {
    return (
        <div>
            <h4>Popup - GeeksforGeeks</h4>
            <Popup trigger=
                {<button> Click to open modal </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                Welcome to GFG!!!
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close modal
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