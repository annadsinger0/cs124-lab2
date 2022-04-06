import './App.css';
import { useEffect} from "react";
import Tools from "./Tools";
import Tasks from "./Tasks";
import AddItem from "./AddItem";
import {useState} from "react";
import DeleteTasks from "./DeleteTasks";
import EditTask from "./EditTask";
import SortBy from "./SortBy";

import { initializeApp } from "firebase/app";
import { getFirestore, query, orderBy, collection, doc, updateDoc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";



function ToDoListView(props) {
    const [showCompleted, setShowCompleted] = useState(true);
    const [selectedTaskIDs, setSelectedTaskIDs] = useState([]);
    // modes: home, delete, edit
    const [mode, setMode] = useState("home");

    const [editTaskID, setEditTaskID] = useState(1);

    const tasksCollection = collection(props.db, props.id);

    const Queries = {
        CreatedSort: query(tasksCollection, orderBy("created")),
        PrioritySort: query(tasksCollection, orderBy("priority", "desc")),
        NameSort: query(tasksCollection, orderBy("name")),
        CompletedSort: query(tasksCollection, orderBy("completed"))
    };

    // created, priority, name, completed
    const [sortBy, setSortBy] = useState(Queries["CreatedSort"]);

    const [tasks, loading, ] = useCollectionData(sortBy);

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

    return (
        <>
            <h1 id={"title"}>ToDo</h1>

            <button onClick={props.onBackToAllListsView} className={"button"}> Back</button>

            <Tools showCompleted={showCompleted} onToggleShowCompleted={handleToggleShowCompleted} mode={mode}
                   onChangeMode={handleChangeMode} onBack={handleBack}/>

            {(mode === "home" || mode === "delete") &&
                <SortBy onChangeSort={handleSetSortBy}/> }

            {/*TODO delete this*/}
            {loading && <h1>loading</h1>}

            {mode !== 'edit' && !loading &&
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
                             loading={loading}
                             selectedTaskIDs={selectedTaskIDs}/>
            }

            {mode === 'edit' && !loading &&
                <EditTask task={tasks.filter(t => t.id === editTaskID)[0]}
                          onToggleSelectTask={handleToggleSelectTask}
                          mode={mode} selected={selectedTaskIDs.includes(editTaskID)} onChangeField={handleChangeField}
                          onDeleteID={handleDeleteID}/>
            }
        </>
    );
}

export default ToDoListView;
