import './App.css';
import {useState} from "react";

function AddTask(props) {
    const [taskName, setTaskName] = useState("");

    function handleKeyPress(e) {
        if(e.key === 'Enter'){
            handleAddTask();
        }
    }

    function handleAddTask() {
        props.onAddTask(taskName);
        setTaskName("");
    }

    return (
        <div id="new-task">
            <input type="button" value="+" id="new-task-button"
                   onClick={handleAddTask}/>
            <input type="text" id="new-task-input" placeholder="Add task"
                   value={taskName} onChange={e => setTaskName(e.target.value)}
                   onKeyPress={handleKeyPress}/>
        </div>
    );
}

export default AddTask;
