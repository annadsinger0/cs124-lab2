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
            <div className="delete-button" onClick={handleDeleteSelected}>
                Delete Selected
            </div>

            <div className="delete-button" onClick={handleDeleteCompleted}>
                Delete Completed {completedTaskCount}
            </div>
        </div>
    );
}

export default DeleteTasks;
