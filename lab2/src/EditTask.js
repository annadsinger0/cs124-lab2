import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import {useState} from "react";
import task from "./Task";

function EditTask(props) {

    const [taskName, setTaskName] = useState("");

    function handleRename(e) {
        props.onChangeField(props.task.id, "name", taskName)
        setTaskName("");
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter'){
            handleRename();
        }
    }

    function onDeleteTask() {
        props.onDeleteID(props.task.id);
        // TODO - get out of delete mode
    }

    return (

        <div id="delete-button-group">
            <div>

                <input type="text" id="rename-input" placeholder="Rename Task" value={taskName}
                       onChange={e => setTaskName(e.target.value)} onKeyPress={handleKeyPress}/>
                    <input type="button" value="Rename" id="rename-button" onClick={handleRename}  />

            </div>

            <div className="delete-button" onClick={onDeleteTask}>
                Delete Task
            </div>
        </div>)
}

export default EditTask;
