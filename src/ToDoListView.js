import './App.css';
import Tools from "./Tools";
import Tasks from "./Tasks";
import AddItem from "./AddItem";
import React, {useState} from "react";
import DeleteTasks from "./DeleteTasks";
import EditTask from "./EditTask";
import SortBy from "./SortBy";

import { query, orderBy, collection, doc, updateDoc, deleteDoc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import {useCollectionData, useDocument, useDocumentData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function ToDoListView(props) {
    const [showCompleted, setShowCompleted] = useState(true);
    const [selectedTaskIDs, setSelectedTaskIDs] = useState([]);
    // modes: home, delete, edit
    const [mode, setMode] = useState("home");

    const [editTaskID, setEditTaskID] = useState(1);

    const listDoc = doc(props.db, "lists/"+props.id);


    const [list, listLoading, _] = useDocumentData(listDoc);

    const tasksCollection = collection(props.db, "lists/"+props.id+"/tasks");

    const Queries = {
        CreatedSort: query(tasksCollection, orderBy("created")),
        PrioritySort: query(tasksCollection, orderBy("priority", "desc")),
        NameSort: query(tasksCollection, orderBy("name")),
        CompletedSort: query(tasksCollection, orderBy("completed"))
    };

    // created, priority, name, completed
    const [sortBy, setSortBy] = useState(Queries["CreatedSort"]);

    const [tasks, tasksLoading, ] = useCollectionData(sortBy);

    function handleChangeField(id, changeField, value) {
        updateDoc(doc(tasksCollection, id), {[changeField]: value});
    }

    function handleChangeMode(newMode, newEditTaskID = null) {
        if (tasks.length === 0 && newMode === "delete") { // pressed delete with no tasks -> no need to change mode
            return;
        }
        if (newEditTaskID) {
            setEditTaskID(newEditTaskID);
        }
        setMode(newMode);
    }

    function handleAddTask(name) {
        const id = generateUniqueID();
        setDoc(doc(tasksCollection, id), {name: name, completed: false, id: id, priority: 0, created: serverTimestamp()});
    }

    function handleToggleShowCompleted() {
        setShowCompleted(!showCompleted);
    }

    function handleToggleSelectTask(id) {
        if (selectedTaskIDs.includes(id)) {
            setSelectedTaskIDs(selectedTaskIDs.filter(t => t !== id));
        } else {
            setSelectedTaskIDs(selectedTaskIDs.concat(id));
        }
    }

    function handleDeleteSelectedTasks() {
        selectedTaskIDs.forEach(id => deleteDoc(doc(tasksCollection, id)));
        setSelectedTaskIDs([]);
    }

    function handleDeleteCompletedTasks () {
        let newSelectedTaskIDs = selectedTaskIDs;
        tasks.forEach(t => {
            if (t.completed) {
                deleteDoc(doc(tasksCollection, t.id));
                let index = newSelectedTaskIDs.indexOf(t.id);
                if (index > -1) {
                    newSelectedTaskIDs.splice(index, 1);
                }
            }
        })
        setSelectedTaskIDs(newSelectedTaskIDs);
    }

    function handleClearSelectedTasks() {
        setSelectedTaskIDs([]);
    }

    function handleDeleteID(id) {
        deleteDoc(doc(tasksCollection, id));
        setMode("home");
    }

    function handleBack() {
        if (mode === "edit") {
            setMode("home");
        }
        if (mode === "delete") {
            handleClearSelectedTasks();
            setMode("home");
        }
    }

    function handleSetSortBy(sort) {
        setSortBy(Queries[sort]);
    }

    function handleChangeListName(name) {
        updateDoc(listDoc, {name: name});
    }

    const titleInput = React.createRef();
    function handleRenameList() {
        titleInput.current.focus();
    }

    function handleBack() {
        if (mode === "home") {
            props.onBackToAllListsView();
        }
        else {
            setMode("home");
        }
    }

    return (
        <>
            <div id={"back-button-and-title-wrapper"}>
                <button onClick={handleBack} className={"button"} id={"home-button"}> Back</button>
                <input type={"text"} onChange={e => handleChangeListName(e.target.value)}
                       value={listLoading ? "loading" : list.name} ref={titleInput}
                       className={"title"} id={"list-title"}/>
            </div>

            {mode !== 'edit' &&
                <Tools showCompleted={showCompleted} onToggleShowCompleted={handleToggleShowCompleted} mode={mode}
                onChangeMode={handleChangeMode} onBack={handleBack} onChangeSort={handleSetSortBy}
                itemType={"task"} onRenameList={handleRenameList}/>
            }

            {/*TODO delete this*/}
            {tasksLoading && <h1>loading</h1>}

            {mode !== 'edit' && !tasksLoading &&
                <Tasks tasks={tasks} onChangeField={handleChangeField} showCompleted={showCompleted}
                       onToggleSelectTask={handleToggleSelectTask} mode={mode} selectedTaskIDs={selectedTaskIDs}
                       onChangeMode={handleChangeMode}/>
            }

            {mode === 'home' &&
                <AddItem onAddTask={handleAddTask} placeholder={"Add task"}/>
            }

            {mode === 'delete' &&
                <DeleteTasks tasks={tasks} onToggleSelectTask={handleToggleSelectTask}
                             onDeleteSelectedTasks={handleDeleteSelectedTasks}
                             onDeleteCompletedTasks={handleDeleteCompletedTasks}
                             onClearSelectedTasks={handleClearSelectedTasks}
                             loading={tasksLoading}
                             selectedTaskIDs={selectedTaskIDs}/>
            }

            {mode === 'edit' && !tasksLoading &&
                <EditTask task={tasks.filter(t => t.id === editTaskID)[0]}
                          onToggleSelectTask={handleToggleSelectTask}
                          mode={mode} selected={selectedTaskIDs.includes(editTaskID)} onChangeField={handleChangeField}
                          onDeleteID={handleDeleteID}/>
            }
        </>
    );
}

export default ToDoListView;
