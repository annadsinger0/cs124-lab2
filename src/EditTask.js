import './App.css';
import {useState} from "react";
import Task from "./Task";
import DeleteModal from "./DeleteModal";
import PriorityButton from "./PriorityButton";

function EditTask(props) {

    const [taskName, setTaskName] = useState(props.task.name);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    function handleRename(e) {
        props.onChangeField(props.task.id, "name", taskName)
    }

    function handleKeyPress(e) {
        if(e.key === 'Enter'){
            handleRename();
        }
    }

    function handleChangePriority(priority) {
        props.onChangeField(props.task.id, "priority", priority);
    }

    return (
        <>
            <div id="todolist">
                <Task task={props.task} onChangeField={props.onChangeField}
                    onToggleSelectTask={props.onToggleSelectTask}
                    mode={props.mode} selected={false}/>
            </div>
            <div id="button-group">
                <div id="priority">
                    <p id="priority-title">priority:</p>
                    <div id="priority-selector">
                        {[0,1,2,3].map((level) =>
                            <PriorityButton priorityLevel={level} onChangePriority={() => handleChangePriority(level)}
                                            isSelectedPriority={props.task.priority === level} level={level}
                                            key={level}/>
                        )}
                    </div>
                </div>

                <div id={"rename"}>
                <input type="text" id="rename-input" placeholder="rename task" value={taskName}
                       onChange={e => setTaskName(e.target.value)} onKeyPress={handleKeyPress}/>
                <input type="button" value="rename" id="rename-button"
                       disabled={taskName === ""} onClick={handleRename} />
                </div>
                <button className="delete-button" onClick={() => {setShowDeleteModal(true)}}>
                    delete task
                </button>
            </div>


            {showDeleteModal && <DeleteModal mode={"edit"} onDelete={() => props.onDeleteID(props.task.id)}
                                             onCancel={() => setShowDeleteModal(false)}/>}
        </>
    )

}

export default EditTask;
