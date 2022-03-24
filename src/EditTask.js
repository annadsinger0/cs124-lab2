import './App.css';
import {useState} from "react";
import Task from "./Task";
import DeleteModal from "./DeleteModal";
import PriorityButton from "./PriorityButton";

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
                    <p id="priority-title">Priority:</p>
                    <div id="priority-selector">
                        {[0,1,2,3].map((level) =>
                            <PriorityButton priorityLevel={level} onChangePriority={() => handleChangePriority(level)}
                                            isSelectedPriority={props.task.priority === level} level={level}
                                            key={level}/>
                        )}
                        {/*<p onClick={() => handleChangePriority(0)}*/}
                        {/*   className={"priority-button" + isSelectedPriority(0)}></p>*/}
                        {/*<p id="1-priority-button" onClick={() => handleChangePriority(1)}*/}
                        {/*   className={"priority-button" + isSelectedPriority(1)}>!</p>*/}
                        {/*<p id="2-priority-button" onClick={() => handleChangePriority(2)}*/}
                        {/*   className={"priority-button" + isSelectedPriority(2)}>! !</p>*/}
                        {/*<p id="3-priority-button" onClick={() => handleChangePriority(3)}*/}
                        {/*   className={"priority-button" + isSelectedPriority(3)}>! ! !</p>*/}
                    </div>
                </div>

                {/*TODO - possibly remove id's*/}
                <input type="text" id="rename-input" placeholder="Rename Task" value={taskName}
                       onChange={e => setTaskName(e.target.value)} onKeyPress={handleKeyPress}/>
                <input type="button" value="Rename" id="rename-button" onClick={handleRename}  />

                <div className="delete-button" onClick={() => {setShowDeleteModal(true)}}>
                    Delete Task
                </div>
            </div>


            {showDeleteModal && <DeleteModal mode={"edit"} onDelete={() => props.onDeleteID(props.task.id)}
                                             onCancel={() => setShowDeleteModal(false)}/>}
        </>
    )

}

export default EditTask;
