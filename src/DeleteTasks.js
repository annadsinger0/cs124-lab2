import './App.css';
import {useState, useEffect} from "react";
import DeleteModal from "./DeleteModal";

function DeleteTasks(props) {

    const [deleteModalState, setDeleteModalState] = useState("none");

    const [completedTaskCount, setCompletedTaskCount] = useState(0);

    useEffect(() => {
        if (!props.loading) {
            setCompletedTaskCount(props.tasks.filter(t => t.completed).length)
        }
    }, [props.tasks, props.loading]);

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
            <div id="button-group">
                <button className="delete-button" onClick={
                    () => props.selectedTaskIDs.length > 0 && setDeleteModalState("selected")
                } disabled={deleteModalState !== "none"}>
                    Delete Selected ({props.selectedTaskIDs.length})
                </button>
                <br/>
                <button className="delete-button" onClick={
                    () => completedTaskCount > 0 && setDeleteModalState("completed")
                } disabled={deleteModalState !== "none"}>
                    Delete Completed ({completedTaskCount})
                </button>
            </div>

            {deleteModalState !== "none" &&
                <DeleteModal mode={props.mode} itemCount={getItemCount()}
                             itemType={deleteModalState}
                             onDelete={handleDelete} onCancel={() => setDeleteModalState("none")}/>}

        </>
    );
}

export default DeleteTasks;
