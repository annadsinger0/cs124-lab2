import logo from './logo.svg';
import './App.css';
import {Fragment} from "react";
import checkboxEmpty from "./assets/checkboxEmpty.png";
import checkboxFull from "./assets/checkboxFull.png";
import trashcan from "./assets/trashcan.png";
import {useState} from "react";
import Task from "./Task";
import DeleteModal from "./DeleteModal";


function EditTask(props) {

    const [taskName, setTaskName] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function handleRename(e) {
        props.onChangeField(props.task.id, "name", taskName)
        setTaskName("");
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter'){
            handleRename();
        }
    }

    return (
        <>
            <div  id="todolist">
                <Task task={props.task} onChangeField={props.onChangeField}
                    onToggleSelectTask={props.onToggleSelectTask}
                    mode={props.mode} selected={false}/>
            </div>
            <div id="delete-button-group">
                <div>
                    <input type="text" id="rename-input" placeholder="Rename Task" value={taskName}
                           onChange={e => setTaskName(e.target.value)} onKeyPress={handleKeyPress}/>
                        <input type="button" value="Rename" id="rename-button" onClick={handleRename}  />

                </div>

                <div className="delete-button" onClick={() => {setShowDeleteModal(true);console.log(showDeleteModal)}}>
                    Delete Task
                </div>
            </div>


            {showDeleteModal && <DeleteModal mode={"edit"} onDelete={() => props.onDeleteID(props.task.id)}
                                             onCancel={() => setShowDeleteModal(false)}/>}
        </>
    )

}

export default EditTask;
