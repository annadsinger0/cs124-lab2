import './App.css';
import Tools from "./Tools";
import Tasks from "./Tasks";
import AddItem from "./AddItem";
import React, {useEffect, useState} from "react";
import DeleteTasks from "./DeleteTasks";
import EditTask from "./EditTask";

import { query, orderBy, collection, doc, updateDoc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function ToDoListView(props) {
    const [showCompleted, setShowCompleted] = useState(true);
    const [selectedTaskIDs, setSelectedTaskIDs] = useState([]);
    // modes: home, delete, edit
    const [mode, setMode] = useState("home");

    const [editTaskID, setEditTaskID] = useState(1);

    const listDoc = doc(props.db, "lists/"+props.id);

    const [list, listLoading, listError] = useDocumentData(listDoc);

    const tasksCollection = collection(props.db, "lists/"+props.id+"/tasks");

    const SortByEnum = {
        SortByCreated: orderBy("created"),
        SortByPriority: orderBy("priority", "desc"),
        SortByName: orderBy("name"),
        SortByCompleted: orderBy("completed")
    };

    // created, priority, name, completed
    const [sortBy, setSortBy] = useState(SortByEnum["SortByCreated"]);

    const [tasks, tasksLoading, taskError] = useCollectionData(query(tasksCollection, sortBy));

    const [title, setTitle] = useState("loading");

    useEffect(() => {
        if (!listLoading) {
            setTitle(list.name)
        }
    }, [list])

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
        setSelectedTaskIDs([]);
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

    function handleSetSortBy(sort) {
        setSortBy(SortByEnum[sort]);
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
        setSelectedTaskIDs([]);
    }

    return (
        <>
            <div id={"back-button-and-title-wrapper"}>
                <button onClick={handleBack} className={"button"} id={"home-button"}> Back</button>
                <input type={"text"} onChange={e => setTitle(e.target.value)}
                       value={listLoading ? "loading" : title} ref={titleInput}
                       className={"title"} id={"list-title"} onBlur={() => handleChangeListName(title)}/>
            </div>

            {mode !== 'edit' &&
                <Tools showCompleted={showCompleted} onToggleShowCompleted={handleToggleShowCompleted} mode={mode}
                onChangeMode={handleChangeMode} onBack={handleBack} onChangeSort={handleSetSortBy}
                itemType={"task"} onRenameList={handleRenameList}/>
            }

            {tasksLoading && <h1>loading</h1>}

            {(listError || taskError) &&
                <h1>Error! Please try again</h1>
            }

            {!(listError || taskError) &&
                <>
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
            }


        </>
    );
}

export default ToDoListView;
