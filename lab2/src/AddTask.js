import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import {useState} from "react";

function AddTask(props) {
    const [taskName, setTaskName] = useState("")
    return (
        <div id="new-task">
            <input type="button" value="+" id="new-task-button" onClick={() => {props.onAddTask(taskName); setTaskName(""); }}/>
            <input type="text" id="new-task-input" placeholder="Add task" value={taskName} onChange={e => setTaskName(e.target.value)}/>

        </div>

    );
}

export default AddTask;
