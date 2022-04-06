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
    const listsCollection = collection(props.db, "lists");

    // modes: home, delete
    const [mode, setMode] = useState("home");

    const Queries = {
        CreatedSort: query(listsCollection, orderBy("created")),
        PrioritySort: query(listsCollection, orderBy("priority", "desc")),
        NameSort: query(listsCollection, orderBy("name")),
        CompletedSort: query(listsCollection, orderBy("completed"))
    };

    // created, priority, name, completed
    const [sortBy, setSortBy] = useState(Queries["CreatedSort"]);

    const [lists, loading, ] = useCollectionData(sortBy);

    function handleChangeField(id, changeField, value) {
        updateDoc(doc(listsCollection, id), {[changeField]: value});
    }

    function handleDeleteID(id) {
        deleteDoc(doc(listsCollection, id));
        setMode("home");
    }

    function handleAddList(name) {
        const id = generateUniqueID();
        setDoc(doc(listsCollection, id), {name: name, id: id, created: serverTimestamp()});
    }

    return (
        <>
            <h1 id={"title"}>ToDo</h1>

            {/*TODO delete this*/}
            {loading && <h1>loading</h1>}

            {!loading && lists.map((l) =>
                <p onClick={() => props.onChangeListId(l.id)}>{l.name}</p>)}

            <AddItem onAddTask={handleAddList} placeholder={"Add list"}/>
            {/*<button onClick={() => handleAddList("thing")}>create new</button>*/}
        </>
    );
}

export default ToDoListView;
