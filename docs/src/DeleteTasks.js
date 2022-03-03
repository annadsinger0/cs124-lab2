import './App.css';
import {useMemo, useState} from "react";
import DeleteModal from "./DeleteModal";

function DeleteTasks(props) {

    const [deleteModalState, setDeleteModalState] = useState("none");

    const completedTaskCount = useMemo(() => props.tasks.filter(t => t.completed).length, [props.tasks]);

    function handleDelete() {
        if (deleteModalState === 'selected') {
            props.onDeleteSelectedTasks();
        }
        if (deleteModalState === 'completed') {
            props.onDeleteCompletedTasks();
        }
        setDeleteModalState("none");
    }

    function getItemCount() {
        if (deleteModalState === 'selected') {
            return props.selectedTaskIDs.length;
        }
        if (deleteModalState === 'completed') {
            return completedTaskCount;
        }
    }

    return (
        <>
            <div id="delete-button-group">
                <div className="delete-button" onClick={
                    () => props.selectedTaskIDs.length > 0 && setDeleteModalState("selected")
                }>
                    Delete Selected ({props.selectedTaskIDs.length})
                </div>

                <div className="delete-button" onClick={
                    () => completedTaskCount > 0 && setDeleteModalState("completed")
                }>
                    Delete Completed ({completedTaskCount})
                </div>
            </div>

            {deleteModalState !== "none" &&
                <DeleteModal mode={props.mode} itemCount={getItemCount()}
                             itemType={deleteModalState}
                             onDelete={handleDelete} onCancel={() => setDeleteModalState("none")}/>}

        </>
    );
}

export default DeleteTasks;
