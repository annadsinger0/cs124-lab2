import './App.css';
import {useMemo, useState} from "react";

function DeleteTasks(props) {

    function handleDeleteSelected() {


    }
    function handleDeleteCompleted() {

    }

    const completedTaskCount = useMemo(() => props.tasks.filter(t => t.completed).length, [props.tasks]);

    return (
        <div id="delete-button-group">
            <div className="delete-button" onClick={props.onDeleteSelectedTasks}>
                Delete Selected ({props.selectedTaskIDs.length})
            </div>

            <div className="delete-button" onClick={props.onDeleteCompletedTasks}>
                Delete Completed ({completedTaskCount})
            </div>
        </div>
    );
}

export default DeleteTasks;
